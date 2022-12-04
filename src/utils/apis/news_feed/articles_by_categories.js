import {NewsFeed, responseBody} from "../NewsFeed.jsx";

const requests = {
    get: (requestObject) => NewsFeed.get(`/articles_by_categories?categories=${requestObject.categories}`).then(responseBody)
};

export const ArticlesByCategories = {
    get: (requestObject) => requests.get(requestObject),
}