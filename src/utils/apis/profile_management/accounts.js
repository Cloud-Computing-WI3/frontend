import {ProfileManagement, responseBody} from "../ProfileManagement.jsx";

const requests = {
    get: (id) => ProfileManagement.get(`/accounts/${id}`).then(responseBody),
};

export const Accounts = {
    get: (id) => requests.get(id),
}