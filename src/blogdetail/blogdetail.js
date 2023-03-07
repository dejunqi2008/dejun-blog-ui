import { Alert, Button, ButtonGroup } from "@mui/material";
import parse from 'html-react-parser';
import React, {useContext} from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext/user-context";
import { getFormatDate } from "../utils/commUtils";
import './blogdetail.css'

export const BlogDetail = () => {
    const { user } = useContext(UserContext);
    const {data, error } = useLoaderData();
    console.log(data);
    const navigate = useNavigate();

    if (!!error) {
        return <Alert severity="error">Something went wrong, refresh the page to try again.</Alert>
    }
    const { title, content, createtime, author, id } = data;

    const handleEdit = () => {
        console.log('handle edit')
        return navigate(`/blog/edit/${id}`);
    }

    const renderButton = () => {
        return (
            <ButtonGroup
                disabled={!user.isLoggedInUser}
                disableElevation
                variant="outlined"
                aria-label="Disabled elevation buttons">
                <Button onClick={handleEdit}>Edit</Button>
                <Button>Delet</Button>
            </ButtonGroup>
        )
    }

    return (
        <div className="blog-detail">
            <h1 className="title">{title}</h1>
            <div className="info-container">
                <span>
                    <a href="#">{author}</a>
                </span>
                <span>{getFormatDate(createtime)}</span>
            </div>
            <div className="content-wrapper">
                {parse(content)}
            </div>
            {renderButton()}
        </div>
    )
}