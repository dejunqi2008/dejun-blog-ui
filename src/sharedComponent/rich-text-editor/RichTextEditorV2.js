import {  useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './RichTextEditor.css';
import { Alert, Button, TextField } from "@mui/material";
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from "draftjs-to-html";
import { baseAPIUrl } from "../../utils/commUtils";
import { useNavigate } from "react-router-dom";
import { useReuqest } from "../../utils/hookUtils";

export const RichTextEditorV2 = (props) => {

    const getEditorState = () => {
        const { isEditMode } = props;
    }

    const [state, setState] = useState({
        error: null,
        editorState: EditorState.createEmpty(),
        title: ''
    })
    const postRequest = useReuqest('POST', `${baseAPIUrl}/blog/new`)
    const navigate = useNavigate();
    const handleEditorChange = (editorState) => {
        setState({
            ...state,
            editorState
        });
    }

    const handleTitleChange = (event) => {
        if (event && event.target) {
            setState({
                ...state,
                title: event.target.value
            })
        }
    }

    const handleSubmit = async () => {
        const {user: { username }} = props;
        const { editorState, title } = state;
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const dummyDom = document.createElement('DIV');
        dummyDom.innerHTML = content;
        if (!title || !dummyDom.innerText) {
            console.log('nothing to submit');
            return;
        }
        
        try {
            const resp = await postRequest({title, content, username});
            const { data: { data }, status } = resp;
            if (status === 200) {
                return navigate(`/blog/${data.id}`);
            }
        } catch (error) {
            setState({...state, error});
        }

    }

    const { isEditMode } = props;
    const headerTitle = isEditMode ? "Edit your blog" : "Write something today"
    if (isEditMode) {
        // const {blog: { title, content }} = props;
        // setState({
        //     ...state,
        //     title
        // });
        // const html = content
        // const contentBlock = htmlToDraft(html);
        // if (contentBlock) {
        //     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        //     const editorState = EditorState.createWithContent(contentState);
        //     setState({
        //         ...state,
        //         editorState
        //     })
        // }
    }

    return (
        <div className="text-editor">
            {state.error && <Alert severity="error">Something went wrong, refresh the page to try again.</Alert>}
            <h1>{headerTitle}</h1>
            <TextField
                label="title"
                variant="outlined"
                value={state.title}
                onChange={handleTitleChange}
                fullWidth
            />
            <Editor
                editorState={state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleEditorChange}
            />
            <Button
                variant="outlined"
                className="submit-btn"
                disabled={!props.user.isLoggedInUser}
                onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
}