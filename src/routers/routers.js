import { BlogDetail } from '../blogdetail/blogdetail';
import { EditBlog } from '../editblog/editblog';
import { createBrowserRouter } from 'react-router-dom';
import { BlogDetailDataLoader } from './dataLoaders';
import { CreateNewBlogPage } from '../createblogpage/createblogpage';
import NavBar from '../homepage/navbar';
import { Alert } from '@mui/material';
import { UserIntro } from '../homepage/about';
import { BlogList } from '../bloglist/bloglist';

const PageName = {
    INTRO: 'INTRO',
    BLOGLIST: 'BLOGLIST',
    CREATE: 'CREATE',
    EDIT: 'EDIT',
    DETAIL: 'DETAIL'
}

const elementPrivider = (name) => {
    let component = <Alert severity="error">Route is not found</Alert>;
    switch (name) {
        case PageName.INTRO:
            component = <><NavBar /><UserIntro /></>;
            break;
        case PageName.BLOGLIST:
            component = (
                <>
                    <NavBar />
                    <BlogList />
                </>
            );
            break;
        case PageName.CREATE:
            component = (
                <>
                    <NavBar />
                    <CreateNewBlogPage />
                </>
            );
            break;
        case PageName.DETAIL:
            component = (
                <>
                    <NavBar />
                    <BlogDetail />
                </>
            );
            break;
        case PageName.EDIT:
            component = (
                <>
                    <NavBar />
                    <EditBlog />
                </>
            );
            break;
        default:
            break;
    }

    return component;
}

export const router = createBrowserRouter([
    {
      path: '/',
      element: elementPrivider(PageName.INTRO)
    },
    {
      path: '/blog/list',
      element: elementPrivider(PageName.BLOGLIST),
      loader: () => null
    },
    {
      path: '/blog/:blogId',
      element: elementPrivider(PageName.DETAIL),
      loader: BlogDetailDataLoader
    },
    {
      path: '/blog/create',
      element: elementPrivider(PageName.CREATE)
    },
    {
      path: 'blog/edit/:blogId',
      element: elementPrivider(PageName.EDIT),
      loader: BlogDetailDataLoader
    }
])

