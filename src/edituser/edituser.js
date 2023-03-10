import { useLoaderData } from "react-router-dom"
import { useState, memo  } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Alert, Button, ButtonGroup, TextField, Box } from "@mui/material";
import htmlToDraft from 'html-to-draftjs';
import { useAuth, useRequest } from "../utils/hookUtils";
import { baseAPIUrl } from "../utils/commUtils";
import draftToHtml from "draftjs-to-html";
import { useNavigate } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import './edituser.css'

async function postImage({image}) {
    const formData = new FormData();
    formData.append("image", image)
  
    const result = await axios.post('http://localhost:8000/api/images/new', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    return result.data
  }
  
export const EditUser = memo(() => {
    const {data: { data }, error} = useLoaderData();
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

    const getEditorState = () => {
        if (!!introduction) {
            const contentBlock = htmlToDraft(introduction);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                return EditorState.createWithContent(contentState);
            }
        }
        return EditorState.createEmpty();
    }

    const [state, setState] = useState({
        error,
        realname,
        emailaddr,
        githubaddr,
        linkedinaddr,
        editorState: getEditorState()
    });

    const [profilephoto, setProfilephoto] = useState('');

    const [file, setFile] = useState(null)

    const postUserRequest = useRequest('POST', `${baseAPIUrl}/user/update`);


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

        const reqBody = {username, realname, emailaddr, githubaddr, linkedinaddr, profilephoto};
        const { editorState } = state;
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        reqBody.introduction = content;

        try {
            const resp = await postUserRequest(reqBody);
            const { data, status } = resp;
            if (status === 200 && data.errno === 0) {
                return navigate(`/${username}`);
            } else {
                setState({...state, error: new Error(data.message)})
            }
        } catch (error) {
            setState({ ...state, error })
        }

    }

    const handleEditorChange = (editorState) => {
        setState({
            ...state,
            editorState
        });
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
        postImage({image: file}).then(result => {
            setProfilephoto(result.data.imagePath)
        })
      }

      const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
      }

    return (
        <div className="text-editor">
            {state.error && <Alert severity="error">Something went wrong, refresh the page to try again.</Alert>}
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
                    {!profilephoto && <Button type="submit" disabled={!file}>upload</Button>}
                </form>
            </Box>
            
            <Editor
                editorState={state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleEditorChange}
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
})
