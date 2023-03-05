
import { Homepage } from '../homepage/homepage'
import { BlogDetail } from '../blogdetail/blogdetail';
import { createBrowserRouter } from 'react-router-dom';
import { BlogDetailDataLoader } from './dataLoaders';
import { CreateNewBlogPage } from '../createblogpage/createblogpage';


export const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />
    },
    {
      path: '/blog/:blogId',
      element: <BlogDetail />,
      loader: BlogDetailDataLoader
    },
    {
      path: '/blog/create',
      element: <CreateNewBlogPage />
    }
])

