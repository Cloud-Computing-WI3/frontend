import {NewsFeed, responseBody} from "../NewsFeed.jsx";

const requests = {
    get: (requestObject) => NewsFeed.get( requestObject.elastic_pointer == null ? `/articles?category_name=${requestObject.category_name}`: `/articles?category_name=${requestObject.category_name}&elastic_pointer=${requestObject.elastic_pointer}`).then(responseBody),
};

export const Articles = {
    get: (requestObject) => requests.get(requestObject),
}