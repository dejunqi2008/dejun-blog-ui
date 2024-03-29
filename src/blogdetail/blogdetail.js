import { Alert, Button, ButtonGroup, Chip } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../userContext/user-context";
import { getFormatDate } from "../utils/commUtils";
import { DeleteModal } from '../deletepage/deletepage';
import { useAuth } from "../utils/hookUtils";
import { CONSTANTS } from "../constants";
import './blogdetail.css'
import { TextRenderer } from "../sharedComponent/text-renderer/TextRenderer";

export const BlogDetail = () => {

    const { user } = useContext(UserContext);
    const {data, error, tagsAssociatedWithBlog } = useLoaderData();
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { username } = useParams();
    const isAuth = useAuth()(username);

    if (!!error) {
        return <Alert severity="error">{CONSTANTS.ERROR.GENERAL_ERROR_MSG}</Alert>
    }
    const { title, content, createtime, author, id } = data;

    const handleEdit = () => {
        return navigate(`/${author}/blog/edit/${id}`);
    }

    const handleDelete = () => {
        setDeleteModalOpen(true);
    }

    const renderButton = () => {
        return (
            <ButtonGroup
                className="edit-btn"
                disableElevation
                variant="outlined"
                aria-label="Disabled elevation buttons">
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </ButtonGroup>
        )
    }

    return (
        <>
            <DeleteModal
                modalOpen={deleteModalOpen}
                setModalOpen={setDeleteModalOpen}
                blogId={id}
                author={user.username}
            />
            <div className="blog-detail">
                <h1 className="title">{title}</h1>
                <div className="info-container">
                    <span>{author}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>{getFormatDate(createtime)}</span>
                </div>
                <div className="content-wrapper text-container">
                    {/* {processContentBeforeRendering(content)} */}
                    <TextRenderer content={content} />
                </div>
                <div className="blog-tag-wrapper">
                    {!!tagsAssociatedWithBlog && tagsAssociatedWithBlog.map(tag => {
                        return <Link key={tag.id} to={`/${username}/blog/tag/${tag.tagname}`}>  
                            <Chip variant="filled" label={tag.tagname}/>
                        </Link>
                    })}
                </div>
                {isAuth && renderButton()}
            </div>
        </>
    )
}