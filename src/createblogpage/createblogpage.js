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
import Editor from "../sharedComponent/rich-text-editor/RichTextEditorV3";



export const CreateNewBlogPage = () => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { tags } = useLoaderData();
    const postRequest = useRequest('POST', `${baseAPIUrl}/blog/new`);
    const [selectedTags, setSelectedTags] = useState([]);
    const [editorState, setEditorState] = useState({
        error: null,
        content: '',
        title: ''
    })

    const disableSubmitBtn = () => {
        const { content, title, error } = editorState;
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
            const {title, content} = editorState;
            const { data: { data }, status } = await postRequest({title, content, username})
            if (status === 200) {
                const blogId = data.id;
                submitTags(selectedTags, blogId);
                return navigate(`/${username}/blog/${data.id}`);
            }
        } catch (error) {
            setEditorState({ ...editorState, error })
        }
    }

    const handleTitleChange = (event) => {
        if (event && event.target) {
            setEditorState({
                ...editorState,
                title: event.target.value
            })
        }
    }

    const handleContentChange = (content) => {
        setEditorState({
            ...editorState,
            content,
        })
    }

    return (
        <div className="text-editor">
            {editorState.error && <Alert severity="error">{editorState.error.message}</Alert>}
            <TextField
                label="title"
                variant="outlined"
                // value={state.title}
                onChange={handleTitleChange}
                fullWidth
            />
            <Editor
                handleContentChange={handleContentChange}
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
