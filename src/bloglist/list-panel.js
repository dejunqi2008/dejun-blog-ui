
import moment from "../../node_modules/moment/moment";
import { Link, Typography } from "../../node_modules/@mui/material/index";
import { Alert } from "../../node_modules/@mui/material/index";

export const ListPanel = ({blogListData, error}) => {

    const renderPostData = (listData, error) => {
        if (error) {
            return <Alert severity="error">Something went wrong, refresh the page to try again.</Alert>
        }

        const comp = [];
        listData?.forEach(blog => {
            const { id, title, content, createtime, author } = blog;
            comp.push((
                <div className="title-wrapper" key={id}>
                    <p className="title"><Link href="#">{title}</Link></p>
                    <div className="info-wrapper">
                        <span>
                            <Link href="">{author}</Link>
                        </span>&nbsp;&nbsp;&nbsp;
                        <span>{moment(createtime).format('LLL')}</span>
                    </div>
                    <Typography noWrap className="content">{content}</Typography>
                </div>
            ));
        })

        return comp;
    }

    return <div className="blog-list">{renderPostData(blogListData, error)}</div>

}