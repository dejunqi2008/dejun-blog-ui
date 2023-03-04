import React from 'react';
import ReactDOM from 'react-dom/client';
import { Detail } from './blogdetail/blogdetail';
import './index.css';
import App from './app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/blog/:bolgId',
    element: <Detail />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

