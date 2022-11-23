import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Auth} from "../api/routes/authentication";
import {useMessage} from "./MessageProvider";
import {useGoogleLogout} from "react-google-login";


export const AccountContext = createContext();
function AccountProvider (props) {
    const localStore = localStorage.getItem("user");
    const localStorageUser = localStore ? JSON.parse(localStore) : null;
    const [user, setUser] = useState(localStorageUser ? localStorageUser : null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorageUser);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh"));
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));
    const navigate = useNavigate();
    const {setMessage} = useMessage();
    const googleClientId = "336520046482-27egm1na9kpsnru77n8dgbm89a9uoqkn.apps.googleusercontent.com";
    const {signOut} = useGoogleLogout({
        googleClientId
    });

    function googleLogin(token, googleId, tokenId) {
        Auth.googleLogin(token, googleId, tokenId)
            .then((data) => {
                localStorage.setItem("access", data.access_token);
                setAccessToken(data.access_token);
                localStorage.setItem("refresh", data.refresh_token);
                setRefreshToken(data.refresh_token);
                if (data.user.picture) {
                    data.user.picture = import.meta.env.VITE_BACKEND_URL + data.user.picture;
                }
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setIsAuthenticated(true);
                navigate("/");
                setMessage({
                    code: 200,
                    text: `Welcome, ${data.user?.given_name} ${data.user?.family_name}!`,
                    show: true,
                    status: "success"
                });
            })

    }
    function login(username, password) {
        Auth.login(username, password)
            .then((data) => {
                localStorage.setItem("access", data.access_token);
                setAccessToken(data.access_token);
                localStorage.setItem("refresh", data.refresh_token);
                setRefreshToken(data.refresh_token);
                if (data.user.avatar) {
                    data.user.avatar = import.meta.env.VITE_BACKEND_URL + data.user.avatar;
                }
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setIsAuthenticated(true);
                navigate("/");
                setMessage({
                    code: 200,
                    text: `Welcome, ${data.user?.given_name} ${data.user?.family_name}!`,
                    show: true,
                    status: "success"
                });
            })
            .catch((e) => {
                console.log(e);
                setMessage({code: e.response.status, text: e.response.data.detail, show: true, status: "error"});
            });
    }

    function refreshUser() {
        if (refreshToken && user) {
            Auth.refresh(refreshToken)
                .then((data) => {
                    if (data.user.picture) {
                        data.user.picture = import.meta.env.VITE_BACKEND_URL + data.user.picture;
                    }
                    setUser(data.user);
                    setIsAuthenticated(true);
                    setAccessToken(data.access_token);
                    localStorage.setItem("access", data.access_token);
                    localStorage.setItem("user", JSON.stringify(user));
                })
                .catch(() => {
                    logout();
                    setMessage({
                        code: 200,
                        text: `You have been logged out.`,
                        show: true,
                        status: "info"
                    });
                });
        }
    }


    function logout() {
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        localStorage.removeItem("user");
        setRefreshToken("");
        setAccessToken("");
        setIsAuthenticated(false);
        setUser();
        signOut();
        navigate("/login");
        setMessage({
            code: 200,
            text: `Successfully logged out.`,
            show: true,
            status: "success"
        });
    }
    useEffect(() => {
        if (localStorage.getItem("refresh") !== null && !isAuthenticated && localStorage.getItem("user")) {
            refreshUser();
        }
    }, []);

    return (
        <AccountContext.Provider value={{user, setUser, isAuthenticated, login, logout, refreshUser, googleLogin, googleClientId}}>
            {props.children}
        </AccountContext.Provider>
    );
}

const useAccount = () => {
    return useContext(AccountContext);
};

export {AccountProvider, useAccount};