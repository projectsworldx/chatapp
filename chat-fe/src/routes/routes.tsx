import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Chat from "../components/chat/chatbox";
import React from "react";
import { isAuthenticated } from "../services/service";
import type { LoaderFunctionArgs } from "react-router-dom";

 const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      loader: protectedLoader,
    },
    {
      path: "/chat",
      element: <Chat />,
      loader: protectedLoader,
      errorElement: <App />
    }
  ]);


  function protectedLoader({ request }: LoaderFunctionArgs) {
    // If the user is not logged in and tries to access `/protected`, we redirect
    // them to `/login` with a `from` parameter that allows login to redirect back
    // to this page upon successful authentication


    const token = localStorage.getItem("token");
    let params = new URLSearchParams();
    let pathname = new URL(request.url).pathname
    params.set("from", pathname);
    console.log("pathname", pathname)
    if (!token && pathname !== '/') {
      console.log("token", pathname)
      return redirect("/");
    }
    else if(token && pathname === '/'){
      console.log("token && pathname", pathname)
      return  redirect("/chat");
    }

    return null;

  }



  export default router;