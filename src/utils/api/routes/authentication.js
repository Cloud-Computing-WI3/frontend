import {API, responseBody} from "../API";

const requests = {
    login: (username, password) => API.post("/auth/login/", {
        email: username,
        password: password
    }).then(responseBody),
    googleLogin: (accessToken, googleId, tokenId) => API.post("/auth/google/", {
        access_token: accessToken,
        code: googleId,
        id_token: tokenId
    }).then(responseBody),
    refresh: (token) => {
        return API.post("/auth/refresh/", {
            refresh: token
        }).then(responseBody)
    },
    register: (account) => {
        return API.post("auth/register/", account, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(responseBody);
    },
}

export const Auth = {
    login: (username, password) => requests.login(username, password),
    googleLogin: (accessToken, googleId, tokenId) => requests.googleLogin(accessToken, googleId, tokenId),
    refresh: (token, id) => requests.refresh(token),
    register: (account) => requests.register(account),
}