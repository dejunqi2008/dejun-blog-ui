import { BlogDetail } from '../blogdetail/blogdetail';
import { EditBlog } from '../editblog/editblog';
import { createBrowserRouter } from 'react-router-dom';
import { BlogDetailDataLoader, UserDataLoader, TagsBlogDataLoader } from './dataLoaders';
import { CreateNewBlogPage } from '../createblogpage/createblogpage';
import NavBar from '../homepage/navbar';
import { Alert } from '@mui/material';
import { UserIntro } from '../homepage/about';
import { BlogList } from '../bloglist/bloglist';
import { HomePage } from '../homepage/homepage';
import { EditUser } from '../edituser/edituser';
import { AggregatedBlogs } from '../aggregatedblogs/aggregatedblogs';

const PageName = {
    USERINTRO: 'USERINTRO',
    BLOGLIST: 'BLOGLIST',
    CREATE_BLOG: 'CREATE_BLOG',
    EDIT_BLOG: 'EDIT_BLOG',
    BLOG_DETAIL: 'BLOG_DETAIL',
    EDIT_USER: 'EDIT_USER',
    TAG_BLOGS: 'TAG_BLOGS'
}

const elementPrivider = (name) => {
    let component = <Alert severity="error">Route is not found</Alert>;
    switch (name) {
        case PageName.USERINTRO:
            component = <UserIntro />;
            break;
        case PageName.BLOGLIST:
            component = <BlogList />
            break;
        case PageName.CREATE_BLOG:
            component = <CreateNewBlogPage />
            break;
        case PageName.BLOG_DETAIL:
            component = <BlogDetail />           
            break;
        case PageName.EDIT_BLOG:
            component = <EditBlog />
            break;
        case PageName.EDIT_USER:
            component = <EditUser />
            break;
        case PageName.TAG_BLOGS:
            component = <AggregatedBlogs />
            break;
        default:
            break;
    }

    return component;
}

const getComponent = (pagename) => {
    return <>
        <NavBar />
        {elementPrivider(pagename)}
    </>
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/:username',
        element: getComponent(PageName.USERINTRO),
        loader: UserDataLoader
    },
    {
        path: '/user/edit/:username',
        element: getComponent(PageName.EDIT_USER),
        loader: UserDataLoader
    },
    {
        path: '/:username/blogs',
        element: getComponent(PageName.BLOGLIST),
        loader: TagsBlogDataLoader,
    },
    {
        path: '/:username/blog/:blogId',
        element: getComponent(PageName.BLOG_DETAIL),
        loader: BlogDetailDataLoader
    },
    {
        path: '/:username/blog/create',
        element: getComponent(PageName.CREATE_BLOG),
        loader: TagsBlogDataLoader
    },
    {
        path: '/:username/blog/edit/:blogId',
        element: getComponent(PageName.EDIT_BLOG),
        loader: BlogDetailDataLoader
    },
    {
        path: '/:username/blog/tag/:tagname',
        element: getComponent(PageName.TAG_BLOGS),
    },
    // {
    //     path: '/:username/photos',
    //     element: <Editor />
    // }
])

