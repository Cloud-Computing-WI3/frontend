import {API, responseBody} from "../API";

const requests = {
    get: (id) => API.get(`/accounts/${id}`).then(responseBody),
};

export const Accounts = {
    get: (id) => requests.get(id),
}