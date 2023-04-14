import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Register from "../component/Register";
import Login from "../component/Login";
import ResetPassword from "../component/ResetPassword";

export const router=createBrowserRouter([
{
    path:'/',
    element:<Main></Main>,
    children:[
        {
            path:'/',
            element:<Register></Register>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/reset',
            element:<ResetPassword></ResetPassword>
        }
    ]
}
])