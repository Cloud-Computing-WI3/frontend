import {API, responseBody} from "../API";

const requests = {
    get: (id) => API.get(`/profiles/${id}`).then(responseBody),
};

export const Profiles = {
    get: (id) => requests.get(id),
}