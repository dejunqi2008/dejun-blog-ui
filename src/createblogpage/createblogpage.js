// import RichTextEditor from "../sharedComponent/rich-text-editor/RichTextEditor"
import { RichTextEditorV2 } from "../sharedComponent/rich-text-editor/RichTextEditorV2";
import { UserContext } from "../userContext/user-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const CreateNewBlogPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const onCancel = () => {
        return navigate(`/${user.username}/blogs`);
    }

    return <RichTextEditorV2
                onCancel={onCancel}
                blog={null}
                isEditMode={false}
                user={user}/>

}