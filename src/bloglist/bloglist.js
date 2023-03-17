import {  useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import { MemoListPannel } from "./list-panel";
import './bloglist.css'
import  { SearchPanel }  from "./search-panel";
import { useParams } from "react-router-dom";
import { useAuth } from "../utils/hookUtils";
import axios from "axios";
import { baseAPIUrl } from "../utils/commUtils";

export const BlogList = () => {

    const { username } = useParams();
    const [blogPosts, setBlogPosts] = useState([]);
    const [error, setError] = useState(null);
    const isAuth = useAuth()(username);
    const [page, setPage] = useState(1);
    const [searchVal, setSearchVal] = useState('');
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        axios.get(`${baseAPIUrl}/blog/listv2?&page=${page}&author=${username}&keyword=${searchVal}`)
        .then(resp => {
            const {
                data: {
                    data,
                    errno,
                    metadata: { numOfPages }
                },
                status
            } = resp;
            if (status === 200 && errno === 0) {
                setBlogPosts(data);
                setTotalPage(numOfPages)
            }
        });
    }, [searchVal, page])

    const handlePageChange = (event, page) => {
        event.preventDefault();
        console.log(page)
        setPage(page)
    }


    return <div className="blog-post">
        <SearchPanel
            setPage={setPage}
            setSearchVal={setSearchVal}
            setError={setError}
            author={username}
            isAuth={isAuth}
            setBlogPosts={setBlogPosts} />
        <MemoListPannel
            blogListData={blogPosts}
            error={error}
            author={username}
            />
        <Pagination
            className="pagination-bar"
            count={totalPage}
            page={page}
            onChange={handlePageChange} />
    </div>;
}
