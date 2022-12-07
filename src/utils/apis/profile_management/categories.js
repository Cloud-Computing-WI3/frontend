import {ProfileManagement, responseBody} from "../ProfileManagement.jsx";

const requests = {
    get: () => ProfileManagement.get(`/categories`).then(responseBody),
};

export const Categories = {
    get: (id) => requests.get(),
}