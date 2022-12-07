import {ProfileManagement, responseBody} from "../ProfileManagement.jsx";

const requests = {
    get: (id) => ProfileManagement.get(`/accounts/${id}`).then(responseBody),
    getCategories: (id) => ProfileManagement.get(`/accounts/${id}/categories`).then(responseBody),
    saveAccount: (account, userId) => ProfileManagement.put(`/accounts/${userId}`, account).then(responseBody),
};

export const Accounts = {
    get: (id) => requests.get(id),
    getCategories: (id) => requests.getCategories(id),
    save: (account, userId) => requests.saveAccount(account, userId),
}