import React from "react";
import router from "./pages/routers";
import { RouterProvider } from "react-router";
import './App.css'

export default function App(){
  return(
    <RouterProvider router={router}/>
  )
}