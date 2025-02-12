import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Plan from './pages/Plan';
import Events from './pages/Events';
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
    path: '/',
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

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//     <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
//   </React.StrictMode>
// );
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
      <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
    </React.StrictMode>
  );
}
