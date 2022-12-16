import {NewsFeed, responseBody} from "../NewsFeed.jsx";

const requests = {
    //if requestObject.elastic_pointer is undfined then 
    get: (requestObject) => NewsFeed.get(requestObject.elastic_pointer == null ? `/articles_by_keywords?keywords=${requestObject.keywords}` : `/articles_by_keywords?keywords=${requestObject.keywords}&elastic_pointer=${requestObject.elastic_pointer}`).then(responseBody)
};

export const ArticlesByKeywords = {
    get: (requestObject) => requests.get(requestObject),
}