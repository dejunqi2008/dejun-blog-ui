import { Chip } from "@mui/material";
import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import './tagpanel.css';
const TagPanel = ({ tags }) => {

    const { username } = useParams(); // user you are visting
    // const { user } = useContext(UserContext); // user logined in
    
    // const [newtag, setNewTag] = useState(null);

    // const newTag = (
    //     <div className="new-tag-input">
    //         <TextField size="small" />
    //     </div>
    // );

    return (
        <>
            <div className="blog-tag-wrapper">
                {tags.map(tag => 
                    <div className="blog-tag" key={tag.id}>
                        <Link  to={`/${username}/blog/tag/${tag.tagname}`}>
                            <Chip  variant="filled" label={tag.tagname} />
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}


export const MemoTagPanel = memo(TagPanel);
