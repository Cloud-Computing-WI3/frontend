import {NewsFeed, responseBody} from "../NewsFeed.jsx";

const requests = {
    get: (requestObject) => NewsFeed.get(`/articles_by_keywords?keywords=${requestObject.keywords}`).then(responseBody)
};

export const ArticlesByKeywords = {
    get: (requestObject) => requests.get(requestObject),
}