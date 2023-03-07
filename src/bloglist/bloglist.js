import { useContext, useState, useEffect, memo } from "react";

import { UserContext } from "../userContext/user-context";
import axios from "../../node_modules/axios/index";
import { baseAPIUrl } from "../utils/commUtils";
import { ListPanel, MemoListPannel } from "./list-panel";
import './bloglist.css'
import  { SearchPanel }  from "./search-panel";
import { useParams } from "react-router-dom";
import { useAuth } from "../utils/hookUtils";

export const BlogList = () => {

    const { username } = useParams();
    const [blogPosts, setBlogPosts] = useState([]);
    const [error, setError] = useState(null);
    const isAuth = useAuth()(username);


    return <div className="blog-post">
        <SearchPanel
            setError={setError}
            author={username}
            isAuth={isAuth}
            setBlogPosts={setBlogPosts} />
        <MemoListPannel
            blogListData={blogPosts}
            error={error}
            author={username}
            />
    </div>;
}
