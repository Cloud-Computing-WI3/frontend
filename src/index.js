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
                path: "user",
                element: <UserPage />,
            }
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);