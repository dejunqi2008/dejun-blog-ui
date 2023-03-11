import { Alert } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { RichTextEditorV2 } from "../sharedComponent/rich-text-editor/RichTextEditorV2";
import { UserContext } from "../userContext/user-context";
import { useContext } from "react";

export const EditBlog = () => {
    const {data, error } = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    if (error) {
        return <Alert severity="error">Something went wrong, refresh the page to try again.</Alert>
    }

    const onCancel = () => {
        return navigate(`/${data.author}/blog/${data.id}`);
    }

    return <RichTextEditorV2
                user={user}
                isEditMode={true}
                blog={data}
                onCancel={onCancel}
            />
}
