import {NewsFeed, responseBody} from "../NewsFeed.jsx";

const requests = {
    get: () => NewsFeed.get("/google_categories").then(responseBody)
};

export const GoogleCategories = {
    get: () => requests.get(),
}