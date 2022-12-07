import axios from "axios";
import {Auth} from "./profile_management/authentication.js";

// baseURL: "https://profile-management-2qda3nwega-uc.a.run.app",

export const ProfileManagement = axios.create({
    baseURL: "https://profile-management-2qda3nwega-uc.a.run.app",
    timeout: 15000,
    headers: {}
});

ProfileManagement.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("access");
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

ProfileManagement.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/login/" && err.response) {
            // Access Token was expired
            if ((err.response.status === 401 && !originalConfig._retry) || (err.response.status === 403 && !originalConfig._retry)|| (err.response.status === 401 && !originalConfig._retry)) {
                if (localStorage.getItem("user")) {
                    originalConfig._retry = true;
                    try {
                        const refreshToken = localStorage.getItem("refresh");
                        if (refreshToken) {
                            Auth.refresh(refreshToken)
                                .then((token) => {
                                    localStorage.setItem("access", token.access);
                                    originalConfig.headers["Authorization"] = `Bearer ${token.access}`;
                                })
                                .catch(() => {
                                    localStorage.removeItem("refresh");
                                    localStorage.removeItem("access");
                                    localStorage.removeItem("user");
                                });
                        }
                        return ProfileManagement(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
        }

        return Promise.reject(err);
    }
);
export const responseBody = (response) => response.data;