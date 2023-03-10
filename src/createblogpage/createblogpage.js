// import RichTextEditor from "../sharedComponent/rich-text-editor/RichTextEditor"
import { RichTextEditorV2 } from "../sharedComponent/rich-text-editor/RichTextEditorV2";
import { UserContext } from "../userContext/user-context";
import { useContext } from "react";

export const CreateNewBlogPage = () => {
    const { user } = useContext(UserContext);
    return <RichTextEditorV2
                blog={null}
                isEditMode={false}
                user={user}/>

}