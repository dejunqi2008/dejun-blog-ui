
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import {  useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { baseAPIUrl } from '../utils/commUtils';
import { MemoListPannel } from "../bloglist/list-panel";
import { Alert } from '@mui/material';

export const AggregatedBlogs = () => {

    const { username, tagname } = useParams();
    const [blogPosts, setBlogPosts] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        axios.get(`${baseAPIUrl}/blog/list?author=${username}&tagname=${tagname}&page=${page}`)
            .then(resp => {
                const {
                    data: {
                        data,
                        errno,
                        metadata: {
                            numOfPages
                        } 
                    }, status
                } = resp;
                
                if (status === 200 && errno === 0) {
                    setBlogPosts(data);
                    setTotalPage(numOfPages)
                } else {
                    setError(new Error("Something went wrong"))
                }
            })
            .catch(err => setError(err))
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const handlePageChange = (event, page) => {
        event.preventDefault();
        setPage(page)
    }

    if (error) {
        return <Alert severity="error" >{error.message}</Alert>
    }

    return (
        <div className="blog-posts">
            <h2>Blog posts related to <b>"{tagname}"</b></h2>
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
        </div>
    )
}

