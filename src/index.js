import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
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

const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <App><ErrorPage /></App>,
        path: "/",
        children: [
            {
                path: "",
                element: <HomePage />,
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);