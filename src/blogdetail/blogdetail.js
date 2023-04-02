import { Alert, Button, ButtonGroup, Chip } from "@mui/material";
import parse from 'html-react-parser';
import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../userContext/user-context";
import { getFormatDate, processHTMLCodeBlock } from "../utils/commUtils";
import { DeleteModal } from '../deletepage/deletepage';
import { useAuth } from "../utils/hookUtils";
import { CONSTANTS } from "../constants";
import Showdown from "showdown";
import './blogdetail.css'


export const BlogDetail = () => {

    const { user } = useContext(UserContext);
    const {data, error, tagsAssociatedWithBlog } = useLoaderData();
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { username } = useParams();
    const isAuth = useAuth()(username);

    const converter = new Showdown.Converter();


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

    const processContentBeforeRendering = (textContent) => {
        textContent = processHTMLCodeBlock(textContent);
        return parse(converter.makeHtml(textContent))
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
                    <span>
                        {/* <a href="#">{author}</a> */}
                        {author}
                    </span>
                    <span>{getFormatDate(createtime)}</span>
                </div>
                <div className="content-wrapper text-container">
                    {processContentBeforeRendering(content)}
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