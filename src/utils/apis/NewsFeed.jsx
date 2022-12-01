import axios from "axios";
import {Articles} from "./news_feed/articles.js";


// baseURL: "https://profile-management-2qda3nwega-uc.a.run.app",

export const NewsFeed = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 15000,
    headers: {}
});

export const responseBody = (response) => response.data;