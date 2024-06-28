import React from 'react';
import ReactDOM from 'react-dom/client';
import {LoginPage, SignUp} from './auth_page';
import Home from './home';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path : "/",
    element: <Home />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'))


root.render(
  <RouterProvider router={router} />
)