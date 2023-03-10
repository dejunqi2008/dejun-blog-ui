import { Alert, Button, ButtonGroup } from "@mui/material";
import parse from 'html-react-parser';
import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../userContext/user-context";
import { getFormatDate } from "../utils/commUtils";
import { DeleteModal } from '../deletepage/deletepage';
import { useAuth } from "../utils/hookUtils";
import './blogdetail.css'

export const BlogDetail = () => {

    const { user } = useContext(UserContext);
    const {data, error } = useLoaderData();
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { username } = useParams();
    const isAuth = useAuth()(username);


    if (!!error) {
        return <Alert severity="error">Something went wrong, refresh the page to try again.</Alert>
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
                    <span>
                        {/* <a href="#">{author}</a> */}
                        {author}
                    </span>
                    <span>{getFormatDate(createtime)}</span>
                </div>
                <div className="content-wrapper">
                    {parse(content)}
                </div>
                {isAuth && renderButton()}
            </div>
        </>
    )
}