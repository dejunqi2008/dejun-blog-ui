import MDEditor from '@uiw/react-md-editor';

export const Editor = ({value, setValue}) => {

    value = value.replace(/&gt;;/g, ">")
                    .replace(/&gt;/g, ">")
                    .replace(/&lt;/g, "<");

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
