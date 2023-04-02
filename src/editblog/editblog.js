import {
    Alert,
    Button,
    TextField,
    ButtonGroup,
    Autocomplete,
    Stack, Chip
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext/user-context";
import { useContext, useState } from "react";
import axios from "axios";
import { baseAPIUrl } from "../utils/commUtils";
import { CONSTANTS } from "../constants";
import Editor from "../sharedComponent/rich-text-editor/RichTextEditorV3";
import { useRequest } from "../utils/hookUtils";
import './editblog.css';


export const EditBlog = () => {
    const {
        data: {
            id, title, content, author
        },
        tags,
        tagsAssociatedWithBlog,
        error
    } = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [selectedTags, setSelectedTags] = useState([]);
    const [editorState, setEditorState] = useState({ error, content, title })
    const postRequest = useRequest('POST', `${baseAPIUrl}/blog/update?id=${id}`)
    
    if (!!error) {
        return <Alert severity="error">{CONSTANTS.ERROR.GENERAL_ERROR_MSG}</Alert>
    }

    const onCancel = () => {
        return navigate(`/${author}/blog/${id}`);
    }

    const submitTags = (tags, blogId) => {
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
                value={editorState.title}
                onChange={handleTitleChange}
                fullWidth
            />
            <Editor
                handleContentChange={handleContentChange}
                content={content}

            />
            <div className="blog-tags">
                {tagsAssociatedWithBlog.map(tag => <Chip key={tag.id} className="blog-tag" variant="filled" label={tag.tagname} />)}
            </div>
            <Stack spacing={3} sx={{ width: 300 }}>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={tags.filter(tag => !tagsAssociatedWithBlog.map(tag => tag.id).includes(tag.id))}
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
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </ButtonGroup>
        </div>
    )
}
