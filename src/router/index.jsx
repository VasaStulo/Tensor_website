import {createBrowserRouter} from "react-router-dom";
import Search from "../pages/Search";
import Root from "./Root";
import ErrorPage from "../pages/ErrorPage";
import Main from "../pages/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Main/>,
            },
            {
                path: "/search",
                element: <Search/>,
            },
        ],
    },
    // {path: '/search', element: <Search/>},
]);