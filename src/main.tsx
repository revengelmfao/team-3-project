import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Plan from './pages/Plan';
import Events from './pages/events';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/loginpage',
    element: <LoginPage />,
  },
  {
    path: '/events',
    element: <Events />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/plan',
    element: <Plan />,
  },
  {
    path: '*',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
