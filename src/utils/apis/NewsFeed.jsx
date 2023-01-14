import axios from "axios";

// NewsFeed implements an axios instance with a baseURL and timeout set for the API endpoint.
export const NewsFeed = axios.create({
    baseURL: "https://news-feed-api-2qda3nwega-uc.a.run.app",
    timeout: 15000,
    headers: {}
});

// extract response body from axios response object
export const responseBody = (response) => response.data;
