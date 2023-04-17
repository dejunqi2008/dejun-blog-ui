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

import { Editor } from "../sharedComponent/editor-v4/editor-v4";
import { useRequest } from "../utils/hookUtils";
import './editblog.css';


export const EditBlog = () => {

    const loaderData = useLoaderData();

    const { data, tags, tagsAssociatedWithBlog } = loaderData;
    const {id, author} = data;
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [selectedTags, setSelectedTags] = useState([]);
    const postRequest = useRequest('POST', `${baseAPIUrl}/blog/update?id=${id}`)
    const [error, setError] = useState(loaderData.error);
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    
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
            <TextField
                label="title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
                fullWidth
            />
            <Editor
                setValue={handleContentChange}
                value={content}
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
