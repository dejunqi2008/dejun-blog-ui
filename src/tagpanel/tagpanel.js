import { Chip } from "@mui/material";
import { memo, useContext } from "react";
import { Link, useParams } from "react-router-dom";

const TagPanel = ({ tags }) => {

    const { username } = useParams();

    const comp = <div className="blog-tag-wrapper">
        {tags.map(tag => 
            <div className="blog-tag">
            <Link key={tag.id} to={`/${username}/blog/tag/${tag.tagname}`}>
                <Chip  variant="filled" label={tag.tagname} />
            </Link>
            </div>
        )}
    </div>
    return comp;
}


export const MemoTagPanel = memo(TagPanel);
