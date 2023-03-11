import {  useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './RichTextEditor.css';
import { Alert, Button, TextField, ButtonGroup } from "@mui/material";
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from "draftjs-to-html";
import { baseAPIUrl } from "../../utils/commUtils";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../utils/hookUtils";

export const RichTextEditorV2 = (props) => {

    const getEditorState = () => {

        const { isEditMode } = props;
        if (isEditMode) {
            const {blog: { content }} = props;
            const html = content;
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                return EditorState.createWithContent(contentState);
            }
        }

        return EditorState.createEmpty();
    }

    const getBlogTitle = () => {
        const { isEditMode } = props;
        if (isEditMode) {
            const {blog: { title }} = props;
            return title;
        }
        return '';
    }

    const [state, setState] = useState({
        error: null,
        editorState: getEditorState(),
        title: getBlogTitle()
    })
    const postRequest = useRequest('POST', `${baseAPIUrl}/blog/new`)
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
            return; // nonthing to submiyt
        }
        
        try {
            const resp = await postRequest({title, content, username});
            const { data: { data }, status } = resp;
            if (status === 200) {
                return navigate(`/${username}/blog/${data.id}`);
            }
        } catch (error) {
            setState({...state, error});
        }

    }


    const headerTitle = props.isEditMode ? "Edit your blog" : "Write something today"


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
            {/* <Button
                variant="outlined"
                className="submit-btn"
                disabled={!props.user.isLoggedInUser}
                onClick={handleSubmit}>
                Submit
            </Button> */}
            <ButtonGroup
                variant="outlined"
                className="submit-btn"
                disableElevation
                aria-label="Disabled elevation buttons">
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={props.onCancel}>Cancel</Button>
            </ButtonGroup>
        </div>
    );
}