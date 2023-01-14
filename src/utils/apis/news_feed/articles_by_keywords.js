import {NewsFeed, responseBody} from "../NewsFeed.jsx";

/*
* Here the requests for the endpoint /articles_by_keywords are handled.
* @param  {Object} requestObject contains keywords and elastic pointer
 */

const requests = {
    // Only include elastic_pointer as query param if not null
    get: (requestObject) => NewsFeed.get(requestObject.elastic_pointer == null ?
        `/articles_by_keywords?keywords=${requestObject.keywords}` :
        `/articles_by_keywords?keywords=${requestObject.keywords}&elastic_pointer=${requestObject.elastic_pointer}`).then(responseBody)
};

export const ArticlesByKeywords = {
    get: (requestObject) => requests.get(requestObject),
}