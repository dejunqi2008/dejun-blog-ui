import MDEditor from '@uiw/react-md-editor';

export const Editor = ({value, setValue}) => {

    return (
        <div className="editor-container">
            <MDEditor
                value={value}
                onChange={setValue}
                preview='edit'
                height={400}
            />
        </div>
    );
}
