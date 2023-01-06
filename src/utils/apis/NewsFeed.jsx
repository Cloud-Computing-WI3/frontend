import axios from "axios";

// https://news-feed-api-2qda3nwega-uc.a.run.app
export const NewsFeed = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 15000,
    headers: {}
});

export const responseBody = (response) => response.data;