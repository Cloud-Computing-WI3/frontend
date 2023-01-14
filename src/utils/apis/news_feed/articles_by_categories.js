import {NewsFeed, responseBody} from "../NewsFeed.jsx";

/*
* Here the requests for the endpoint artices_by_categories are handled.
* @param  {array} categories containing list of objects including values for keys "name" and "pointer".
 */

const requests = {
    get: (categories) => NewsFeed.post("/articles_by_categories?categories", {categories: categories})
        .then(responseBody)
};

export const ArticlesByCategories = {
    get: (categories) => requests.get(categories),
}