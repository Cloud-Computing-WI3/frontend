import {ProfileManagement, responseBody} from "../ProfileManagement.jsx";

const requests = {
    get: () => ProfileManagement.get(`/keywords`).then(responseBody),
};

export const Keywords = {
    get: () => requests.get(),
}