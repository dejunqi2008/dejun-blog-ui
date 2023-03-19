import { Alert } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { RichTextEditorV2 } from "../sharedComponent/rich-text-editor/RichTextEditorV2";
import { UserContext } from "../userContext/user-context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseAPIUrl } from "../utils/commUtils";
import { CONSTANTS } from "../constants";
import './editblog.css';


export const EditBlog = () => {
    const {data, tags, tagsAssociatedWithBlog, error } = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [selectedTags, setSelectedTags] = useState([]);
    
    if (!!error) {
        return <Alert severity="error">{CONSTANTS.ERROR.GENERAL_ERROR_MSG}</Alert>
    }

    const onCancel = () => {
        return navigate(`/${data.author}/blog/${data.id}`);
    }

    const handleSubmitTags = async (tags, blogId) => {
        await axios.post(`${baseAPIUrl}/associatetag/new`, {
            blogId,
            tagIds: tags.map(tag => tag.id)
        })
    }

    return <RichTextEditorV2
                handleSubmitTags={handleSubmitTags}
                tags={tags}
                displayTags={tagsAssociatedWithBlog}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                user={user}
                isEditMode={true}
                blog={data}
                onCancel={onCancel}
            />
}
