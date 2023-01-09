import {ProfileManagement, responseBody} from "../ProfileManagement.jsx";

const requests = {
    get: (id) => ProfileManagement.get(`/accounts/${id}`).then(responseBody),
    getCategories: () => ProfileManagement.get(`/accounts/categories`).then(responseBody),
    getKeywords: () => ProfileManagement.get(`/accounts/keywords`).then(responseBody),
    saveAccount: (account, userId) => ProfileManagement.put(`/accounts/${userId}`, JSON.stringify(account)).then(responseBody),
};

export const Accounts = {
    get: (id) => requests.get(id),
    getCategories: () => requests.getCategories(),
    getKeywords: () => requests.getKeywords(),
    save: (account, userId) => requests.saveAccount(account, userId),
}