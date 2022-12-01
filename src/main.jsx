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

const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <App><ErrorPage /></App>,
        path: "/",
        children: [
            {
                path: "",
                element: <HomePage />,
                loader: async () => {
                    return Articles.get({category_name: "sports", elastic_pointer: null})
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
