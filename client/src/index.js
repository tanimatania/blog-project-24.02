
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PostProvider } from './contexts/PostContext';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PostProvider>
      <App />
    </PostProvider>
  </React.StrictMode>,

);
