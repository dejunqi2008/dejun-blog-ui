import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/prism'

export const TextRenderer = ({content}) => {

    return (
        <ReactMarkdown
            children={content}
            components={{
            code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
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
