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
import NewsPage from "./pages/NewsPage";
import {Articles} from "./utils/apis/news_feed/articles.js";
import {ArticlesByKeywords} from "./utils/apis/news_feed/articles_by_keywords.js";
import {ArticlesByCategories} from "./utils/apis/news_feed/articles_by_categories.js";


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
                path: "/categories/:categoryName",
                element: <NewsPage/>,
                loader: ({params}) => {
                    return Articles.get({category_name: params.categoryName, elastic_pointer: null}).then(res => {
                        return res;
                    }).catch(e => {
                        console.log(e);
                    })
                },
            },
            {
                path: "/keywords/:keywords",
                element: <NewsPage />,
                loader: ({params}) => {
                    return ArticlesByKeywords.get({keywords: params.keywords, elastic_pointer: null}).then(res => {
                        return res;
                    }).catch(e => {
                        console.log(e);
                    })
                }
            },
            {
                path: "/my_categories/:categories",
                element: <NewsPage/>,
                loader: ({params}) => {
                    return ArticlesByCategories.get({categories: params.categories, elastic_pointer: null}).then(res => {
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
