
import { Alert } from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { getFormatDate } from "../utils/commUtils";
import './blogdetail.css'

export const BlogDetail = () => {
    const {data, error } = useLoaderData();
    console.log(data, error);
    if (!!error) {
        return <Alert severity="error">Something went wrong, refresh the page to try again.</Alert>
    }

    const { title, content, createtime, author } = data;
    return <div>
        <h1 id="title">{title}</h1>
        <div id="info-container">
            <span>
                <a href="#">{author}</a>
            </span>
            <span>{getFormatDate(createtime)}</span>
        </div>
        <div id="content-wrapper">
            <p className="conent">{content}</p>
        </div>
    </div>
}