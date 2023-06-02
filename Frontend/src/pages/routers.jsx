import { createBrowserRouter } from "react-router-dom";
import Landingpage from "./Landingpage";
import Home from "./Home";
import Layout from "./Layout";

const router=createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {path:'/',element:<Landingpage/>},
            {path:'/home',element:<Home/>},
        ]
    }
])

export default router;