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

  let login = {
    status : false,
    auth : {},
  };

  function setLogin(val) {
    login["status"] = val["status"];
    login["auth"] = val["auth"];
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage login = {login} setLogin = {setLogin} />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path : "/",
      element: <Home login = {login} setLogin = {setLogin}/>
    }
  ]);

  return <RouterProvider router={router} />
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <TopRoot />
)