import { useLoaderData } from "react-router-dom"
import { useState, memo  } from "react";
import { Editor } from "../sharedComponent/editor-v4/editor-v4";
import { Alert, Button, ButtonGroup, TextField, Box } from "@mui/material";
import { useAuth, useRequest } from "../utils/hookUtils";
import { baseAPIUrl } from "../utils/commUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './edituser.css'

async function postImage({image, username}) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("username", username);
    const result = await axios.post(
        `${baseAPIUrl}/images/profile/new`,
        formData, { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return result.data
  }
  
const EditUser = memo(() => {

    const loaderData = useLoaderData();
    const {data: { data }} = loaderData
    const navigate = useNavigate();
    
    const {
        username,
        realname,
        introduction,
        emailaddr,
        githubaddr,
        linkedinaddr
    } = data;

    const isAuth = useAuth()(username);

    const [content, setContent] = useState(introduction);

    const [state, setState] = useState({
        realname,
        emailaddr,
        githubaddr,
        linkedinaddr
    });

    const [error, setError] = useState(loaderData.error);

    const [profilephoto, setProfilephoto] = useState('');

    const [file, setFile] = useState(null)

    const postUserRequest = useRequest('POST', `${baseAPIUrl}/user/update`);

    const handleContentChange = (content) => {
        setContent(content);
    }


    const handleSubmit = async () => {
        const {
            realname,
            emailaddr,
            githubaddr,
            linkedinaddr,
        } = state;

        if (!username || !realname) {
            return;
        }

        const reqBody = {
            username,
            realname,
            emailaddr,
            githubaddr,
            linkedinaddr,
            profilephoto,
            introduction: content
        };

        try {
            const resp = await postUserRequest(reqBody);
            const { data, status } = resp;
            if (status === 200 && data.errno === 0) {
                return navigate(`/${username}`);
            } else {
                setError(new Error(data.message));
            }
        } catch (error) {
            setState(error);
        }

    }

    const handleFieldChange = (fieldName, event) => {
        setState({
            ...state,
            [fieldName]: event.target.value
        })
    }

    const renderFilds = () => {
        const fieldNameMapping = {
            realname: {
                label: 'Full Name',
                func: (e) => handleFieldChange('realname', e)
            },
            emailaddr: {
                label: 'Email',
                func: (e) => handleFieldChange('emailaddr', e)
            },
            githubaddr: {
                label: 'Github',
                func: (e) => handleFieldChange('githubaddr', e)
            },
            linkedinaddr: {
                label: 'LinkedIn',
                func: (e) => handleFieldChange('linkedinaddr', e)
            }
        }

        const components = [];
        Object.keys(fieldNameMapping).forEach((key, idx) => {
            const label = fieldNameMapping[key].label;
            const onChange = fieldNameMapping[key].func
            components.push(
                <TextField
                    key={idx}
                    label={label}
                    variant="outlined"
                    value={state[key]}
                    onChange={onChange}
                />
            );
        })
        return components;
    }

    const submit = event => {
        if (!file) return;
        event.preventDefault()
        postImage({image: file, username}).then(result => {
            console.log(result);
            setProfilephoto(result.data.imagePath)
        }).catch(error => setError(error));
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    return (
        <div className="text-editor">
            {error && <Alert severity="error">{error.message}</Alert>}
            <h1>Edit your profile</h1>
            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">
                {renderFilds()}
            </Box>
            <Box>
                <form onSubmit={submit}>
                    <input id="profile-img-upload" onChange={fileSelected} type="file" accept="image/*" />
                    {!profilephoto && <Button sx={{top: '30px'}} type="submit" disabled={!file}>upload</Button>}
                </form>
            </Box>
            
            <Editor
                setValue={handleContentChange}
                value={content}
            />
            <ButtonGroup
                className="submit-btn"
                disableElevation
                variant="outlined"
                aria-label="Disabled elevation buttons">
                <Button onClick={handleSubmit} disabled={!isAuth}>Submit</Button>
                <Button onClick={() => navigate(`/${username}`)}>Cancel</Button>
            </ButtonGroup>
        </div>
    );
});

export default EditUser;
