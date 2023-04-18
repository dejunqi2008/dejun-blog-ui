import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { CookiesProvider, useCookies } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider >
      <App />
    </CookiesProvider>
  </React.StrictMode>
);

