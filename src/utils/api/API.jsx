import axios from "axios";
import {Auth} from "./routes/authentication";



export const API = axios.create({
    baseURL: process.env.NODE_ENV ? "http://localhost:8000" : undefined,
    timeout: 15000,
    headers: {}
});

API.interceptors.request.use(
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

API.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/login/" && err.response) {
            // Access Token was expired
            if ((err.response.status === 401 && !originalConfig._retry) || (err.response.status === 403 && !originalConfig._retry)) {
                if (localStorage.getItem("user")) {
                    originalConfig._retry = true;
                    try {
                        const refreshToken = localStorage.getItem("refresh");
                        if (refreshToken) {
                            Auth.refresh(refreshToken)
                                .then((token) => {
                                    console.log("REFRESH", token);
                                    localStorage.setItem("access", token.access);
                                    originalConfig.headers["Authorization"] = `Bearer ${token.access}`;
                                })
                                .catch(() => {
                                    localStorage.removeItem("refresh");
                                    localStorage.removeItem("access");
                                    localStorage.removeItem("user");
                                });
                        }
                        return API(originalConfig);
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