import {NewsFeed, responseBody} from "../NewsFeed.jsx";

const requests = {
    get: (requestObject) => NewsFeed.get(`/articles?category_name=${requestObject.category_name}`).then(responseBody),
};

export const Articles = {
    get: (requestObject) => requests.get(requestObject),
}