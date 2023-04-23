import {
    Alert,
    Button,
    TextField,
    ButtonGroup,
    Autocomplete,
    Stack
} from "@mui/material";
import { UserContext } from "../userContext/user-context";
import { useContext, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { baseAPIUrl } from "../utils/commUtils";
import axios from "axios";
import { useRequest } from "../utils/hookUtils";
// import Editor from "../sharedComponent/rich-text-editor/RichTextEditorV3";
import { Editor } from "../sharedComponent/editor-v4/editor-v4";



const CreateNewBlogPage = () => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { tags } = useLoaderData();
    const postRequest = useRequest('POST', `${baseAPIUrl}/blog/new`);
    const [selectedTags, setSelectedTags] = useState([]);
    const [error, setError] = useState(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const disableSubmitBtn = () => {
        const dom = document.createElement('div');
        dom.innerHTML = content;
        return !dom.innerText || !(title.trim()) || error;
    }

    const onCancel = () => {
        return navigate(`/${user.username}/blogs`);
    }

    const submitTags = (tags, blogId) => {
        if (tags.length === 0) return;
        return axios.post(`${baseAPIUrl}/associatetag/new`, {
            blogId,
            tagIds: tags.map(tag => tag.id)
        })
    }


    const handleSubmit = async () => {
        try {
            const { username } = user;
            const { data: { data }, status } = await postRequest({title, content, username})
            if (status === 200) {
                const blogId = data.id;
                submitTags(selectedTags, blogId);
                return navigate(`/${username}/blog/${data.id}`);
            }
        } catch (error) {
            setError(error);
        }
    }

    const handleTitleChange = (event) => {
        if (event && event.target) {
            setTitle(event.target.value);
        }
    }

    const handleContentChange = (content) => {
        setContent(content)
    }

    return (
        <div className="text-editor">
            {error && <Alert severity="error">{error.message}</Alert>}
            <TextField
                label="title"
                variant="outlined"
                // value={state.title}
                onChange={handleTitleChange}
                fullWidth
            />
            <Editor
                setValue={handleContentChange}
                value={content}
            />
            <Stack spacing={3} sx={{ width: 300 }}>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={tags}
                    getOptionLabel={(option) => option.tagname}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="choose tag for this post"
                        />
                    )}
                    onChange={(event, values) => setSelectedTags(values)}
                />
            </Stack>
            <ButtonGroup
                variant="outlined"
                className="submit-btn"
                disableElevation
                aria-label="Disabled elevation buttons">
                <Button onClick={handleSubmit} disabled={disableSubmitBtn()}>Submit</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </ButtonGroup>
        </div>
    );

}

export default CreateNewBlogPage;