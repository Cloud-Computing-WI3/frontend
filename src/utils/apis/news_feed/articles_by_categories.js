import {NewsFeed, responseBody} from "../NewsFeed.jsx";

const requests = {
    get: (categories) => NewsFeed.post("/articles_by_categories?categories", {categories: categories})
        .then(responseBody)
};

export const ArticlesByCategories = {
    get: (categories) => requests.get(categories),
}