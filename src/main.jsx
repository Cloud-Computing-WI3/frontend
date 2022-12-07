import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/user/UserPage";
import LoginPage from "./pages/LoginPage";
import RequireAuthRoute from "./layout/RequireAuthRoute";
import RegisterPage from "./pages/RegisterPage";
import {Articles} from "./utils/apis/news_feed/articles.js";
import NewsPage from "./pages/NewsPage";

const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <App><ErrorPage /></App>,
        path: "/",
        children: [
            {
                path: "",
                element: <HomePage />,
                loader: () => {
                    return Articles.get({category_name: "general", elastic_pointer: null}).then(res => {
                        return res;
                    }).catch(e => {
                        console.log(e);
                        return null;
                    })
                },
            },
            {
                path: ":categoryName",
                element: <NewsPage />,
                loader: ({params}) => {
                    return Articles.get({category_name: params.categoryName, elastic_pointer: null}).then(res => {
                        return res;
                    }).catch(e => {
                        console.log(e);
                    })
                },
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                element: <RequireAuthRoute />,
                children: [
                    {
                        path: "user",
                        element: <UserPage />,
                    }
                ]
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
