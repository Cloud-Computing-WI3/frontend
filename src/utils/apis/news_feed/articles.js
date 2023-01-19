import {NewsFeed, responseBody} from "../NewsFeed.jsx";

/*
* Here the requests for the endpoint /articles are handled.
* @param  {Object} requestObject contains category_name and elastic pointer
 */

// to avoid getting cached results set BYPASS_CACHE to true; cache only relevant for read_articles endpoint
const BYPASS_CACHE = false
const cache_param = BYPASS_CACHE ? `&bypass_cache=true` : `&bypass_cache=false`

const requests = {
    // only include elastic pointer query param if not null
    get: (requestObject) => NewsFeed.get(requestObject.elastic_pointer == null ?
        `/articles?category_name=${requestObject.category_name}` + cache_param:
        `/articles?category_name=${requestObject.category_name}&elastic_pointer=${requestObject.elastic_pointer}` + cache_param
    ).then(responseBody),
};

export const Articles = {
    get: (requestObject) => requests.get(requestObject),
}