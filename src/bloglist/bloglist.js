import React, { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import { baseAPIUrl } from "../utils/commUtils";
import { ListPanel } from "./list-panel";
import './bloglist.css'
import { SearchPanel } from "./search-panel";


export const BlogList = ({blogPosts, setBlogPosts }) => {
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(baseAPIUrl + '/blog/list');
                console.log(res);
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
    }, [])


    return <div className="blog-post">
        <SearchPanel />
        <ListPanel blogListData={blogPosts} error={error} />
    </div>;
}