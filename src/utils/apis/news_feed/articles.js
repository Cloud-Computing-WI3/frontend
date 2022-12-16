import {NewsFeed, responseBody} from "../NewsFeed.jsx";

// to avoid getting cached results set BYPASS_CACHE to true
const BYPASS_CACHE = false
const cache_param = BYPASS_CACHE ? `&bypass_cache=true` : `&bypass_cache=false`

const requests = {
    get: (requestObject) => NewsFeed.get(requestObject.elastic_pointer == null ?
        `/articles?category_name=${requestObject.category_name}` + cache_param:
        `/articles?category_name=${requestObject.category_name}&elastic_pointer=${requestObject.elastic_pointer}` + cache_param
    ).then(responseBody),
};

export const Articles = {
    get: (requestObject) => requests.get(requestObject),
}