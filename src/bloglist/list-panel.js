import moment from "moment/moment";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { memo } from "react";
import './list-panel.css';

export const ListPanel = ({blogListData, error}) => {

    const renderPostData = (listData, error) => {
        if (error) {
            return <Alert severity="error">Something went wrong, refresh the page to try again.</Alert>
        }

        const comp = [];
        listData?.forEach(blog => {
            const { id, title, createtime, author } = blog;
            comp.push((
                <div className="title-wrapper" key={id}>
                    <Link to={`/${author}/blog/${id}`} className="title">{title}</Link>
                    <div className="info-wrapper">
                        <span>
                            <Link >{author}</Link>
                        </span>&nbsp;&nbsp;&nbsp;
                        <span>{moment(createtime).format('LLL')}</span>
                    </div>
                </div>
            ));
        })

        return comp;
    }

    return <div className="list-panel">{renderPostData(blogListData, error)}</div>

}

export const MemoListPannel = memo(ListPanel);