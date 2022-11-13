import {API, responseBody} from "../API";

const requests = {
    login: (username, password) => API.post("/auth/login/", {
        email: username,
        password: password
    }).then(responseBody),
    refresh: (refresh, id) => API.post("/auth/refresh/", {
        refresh: refresh,
        id: id
    }).then(responseBody),
}

export const Auth = {
    login: (username, password) => requests.login(username, password),
    refresh: (refreshToken, id) => requests.refresh(refreshToken, id),
}