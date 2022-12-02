import axios from "axios";


export const NewsFeed = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 15000,
    headers: {}
});

export const responseBody = (response) => response.data;