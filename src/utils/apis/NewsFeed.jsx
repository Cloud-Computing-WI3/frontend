import axios from "axios";


export const NewsFeed = axios.create({
    baseURL: "https://news-feed-api-2qda3nwega-uc.a.run.app",
    timeout: 15000,
    headers: {}
});

export const responseBody = (response) => response.data;