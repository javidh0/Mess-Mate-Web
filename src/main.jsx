import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {LoginPage, SignUp} from './auth_page/auth_page';
import Home from './home/home';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function TopRoot() {
  // const [login, setLogin] = useState({
  //   status : false,
  //   auth : {}
  // });

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path : "/",
      element: <Home/>
    }
  ]);

  return <RouterProvider router={router} />
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <TopRoot />
)