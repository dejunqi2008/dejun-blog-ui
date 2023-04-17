import MDEditor from '@uiw/react-md-editor';

export const Editor = ({value, setValue}) => {

    value = value.replace(/&gt;;/g, ">")
                    .replace(/&gt;/g, ">")
                    .replace(/&lt;/g, "<");

    return (
        <div data-color-mode="light">
            <MDEditor
                highlightEnable={true}
                value={value}
                onChange={setValue}
                // preview='edit'
                height={400}
            />
        </div>
    );
}
