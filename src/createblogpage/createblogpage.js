import { RichTextEditorV2 } from "../sharedComponent/rich-text-editor/RichTextEditorV2";
import { UserContext } from "../userContext/user-context";
import { useContext, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { baseAPIUrl } from "../utils/commUtils";
import axios from "axios";


export const CreateNewBlogPage = () => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { tags } = useLoaderData();
    const [selectedTags, setSelectedTags] = useState([]);

    const onCancel = () => {
        return navigate(`/${user.username}/blogs`);
    }

    const handleSubmitTags = async (tags, blogId) => {
        await axios.post(`${baseAPIUrl}/associatetag/new`, {
            blogId,
            tagIds: tags.map(tag => tag.id)
        })
    }

    return <RichTextEditorV2
                tags={tags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                displayTags={[]}
                onCancel={onCancel}
                handleSubmitTags={handleSubmitTags}
                blog={null}
                isEditMode={false}
                user={user}/>

}