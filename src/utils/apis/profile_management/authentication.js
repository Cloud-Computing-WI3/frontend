import {ProfileManagement, responseBody} from "../ProfileManagement.jsx";

const requests = {
    login: (username, password) => ProfileManagement.post("/auth/login/", {
        email: username,
        password: password
    }).then(responseBody),
    googleLogin: (accessToken, googleId, tokenId) => ProfileManagement.post("/auth/google/", {
        access_token: accessToken,
        code: googleId,
        id_token: tokenId
    }).then(responseBody),
    refresh: (token) => {
        return ProfileManagement.post("/auth/refresh/", {
            refresh: token
        }).then(responseBody)
    },
    register: (account) => {
        return ProfileManagement.post("accounts/registration/", account, {
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