import moment from "moment/moment";
import { Typography, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import { memo } from "react";

export const ListPanel = ({blogListData, error}) => {

    const renderPostData = (listData, error) => {
        if (error) {
            return <Alert severity="error">Something went wrong, refresh the page to try again.</Alert>
        }

        const comp = [];
        listData?.forEach(blog => {
            const { id, title, content, createtime, author } = blog;
            comp.push((
                <div className="title-wrapper" key={id}>
                    <p className="title"><Link to={`/${author}/blog/${id}`}>{title}</Link></p>
                    <div className="info-wrapper">
                        <span>
                            <Link >{author}</Link>
                        </span>&nbsp;&nbsp;&nbsp;
                        <span>{moment(createtime).format('LLL')}</span>
                    </div>
                    <Typography noWrap className="content">{parse(content, {
                        replace: dom => {
                            if (dom.name === 'p') {
                                dom.name = 'span'
                            }
                        }
                    })}</Typography>
                </div>
            ));
        })

        return comp;
    }

    return <div className="blog-list">{renderPostData(blogListData, error)}</div>

}

export const MemoListPannel = memo(ListPanel);