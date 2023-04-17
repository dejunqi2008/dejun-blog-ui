import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/prism'

export const TextRenderer = ({content}) => {
    const processedConetnt = content.replace(/&gt;;/g, ">")
                                    .replace(/&gt;/g, ">")
                                    .replace(/&lt;/g, "<");
    return (
        <ReactMarkdown
            children={processedConetnt}
            components={{
            code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                const str = String(children).replace(/\n$/, '');
                return !inline && match ? (
                <SyntaxHighlighter
                    {...props}
                    children={str}
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                />
                ) : (
                <code {...props} className={className}>
                    {children}
                </code>
                )
            }
            }}
        />
    );
}
