import { Alert } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { RichTextEditorV2 } from "../sharedComponent/rich-text-editor/RichTextEditorV2";
import { UserContext } from "../userContext/user-context";
import { useContext } from "react";

export const EditBlog = () => {
    const {data, error } = useLoaderData();
    const { user } = useContext(UserContext);
    if (error) {
        return <Alert severity="error">Something went wrong, refresh the page to try again.</Alert>
    }
    return <RichTextEditorV2
                user={user}
                isEditMode={true}
                blog={data}
            />
}