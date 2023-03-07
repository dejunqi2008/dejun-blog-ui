import { useContext, useState, useEffect } from "react";

import { UserContext } from "../userContext/user-context";
import axios from "../../node_modules/axios/index";
import { baseAPIUrl } from "../utils/commUtils";
import { ListPanel } from "./list-panel";
import './bloglist.css'
import { SearchPanel } from "./search-panel";


export const BlogList = () => {
    const context = useContext(UserContext);
    const { user }  = context
    const [blogPosts, setBlogPosts] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(baseAPIUrl + '/blog/list');
                const { status, data } = res;
                if (status === 200) {
                    setBlogPosts(data.data);
                }
            } catch (err) {
                setError(err);
            }
        }
        if (blogPosts.length === 0) {
            getPost();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="blog-post">
        <SearchPanel />
        <ListPanel blogListData={blogPosts} error={error} isLoggedInUser={user.isLoggedInUser} />
    </div>;
}
