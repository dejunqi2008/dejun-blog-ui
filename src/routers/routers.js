
import { Homepage } from '../homepage/homepage'
import { BlogDetail } from '../blogdetail/blogdetail';
import { createBrowserRouter } from 'react-router-dom';
import { BlogDetailDataLoader } from './dataLoaders';




export const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />
    },
    {
      path: '/blog/:blogId',
      element: <BlogDetail />,
      loader: BlogDetailDataLoader
    }
])

