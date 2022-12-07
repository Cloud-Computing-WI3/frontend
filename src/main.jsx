import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
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
import {Accounts} from "./utils/apis/profile_management/accounts.js";


const router = createBrowserRouter([
    {
        element: <App/>,
        errorElement: <App><ErrorPage/></App>,
        path: "/",
        children: [
            {
                path: "login",
                element: <LoginPage/>,
            },
            {
                path: "register",
                element: <RegisterPage/>,
            },
            {
                element: <RequireAuthRoute/>,
                children: [
                    {
                        path: "",
                        element: <HomePage/>,
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
                        path: "/my/keywords",
                        element: <NewsPage title={"My keywords"}/>,
                        loader: () => {
                            return Accounts.getKeywords().then(keywords => {
                                const keywordNames = keywords.map(c => c.name).join(",");
                                if (keywordNames.length > 0) {
                                    return ArticlesByKeywords.get({
                                        keywords: keywordNames,
                                        elastic_pointer: null
                                    }).then(res => {
                                        return res;
                                    }).catch(e => {
                                        console.log(e);
                                        return [];
                                    })
                                } else {
                                    return [];
                                }
                            }).catch(e => {
                                console.log(e);
                                return []
                            })
                        },
                    },
                    {
                        path: "/my/categories",
                        element: <NewsPage title={"My categories"}/>,
                        loader: () => {
                            return Accounts.getCategories().then(categories => {
                                const categoryNames = categories.map(c => c.name).join(",");
                                if (categoryNames.length > 0) {
                                    return ArticlesByCategories.get({
                                        categories: categoryNames,
                                        elastic_pointer: null
                                    }).then(res => {
                                        return res;
                                    }).catch(e => {
                                        console.log(e);
                                        return [];
                                    })
                                } else {
                                    return [];
                                }
                            }).catch(e => {
                                console.log(e);
                                return []
                            })
                        },
                    },
                    {
                        path: "/categories/:categoryName",
                        element: <NewsPage/>,
                        loader: ({params}) => {
                            return Articles.get({
                                category_name: params.categoryName,
                                elastic_pointer: null
                            }).then(res => {
                                return res;
                            }).catch(e => {
                                console.log(e);
                            })
                        },
                    },
                    {
                        path: "user",
                        element: <UserPage/>,
                    }
                ]
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
