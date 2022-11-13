import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Auth} from "../api/routes/authentication";
import {useMessage} from "./MessageProvider";

export const ProfileContext = createContext();

function ProfileProvider (props) {
    const localStore = localStorage.getItem("user");
    const localStorageUser = localStore ? JSON.parse(localStore) : null;
    const [user, setUser] = useState(localStorageUser ? localStorageUser : null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorageUser);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh"));
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));
    const navigate = useNavigate();
    const {setMessage} = useMessage();

    function login(username, password) {
        Auth.login(username, password)
            .then((data) => {
                localStorage.setItem("access", data.access);
                setAccessToken(data.access);
                localStorage.setItem("refresh", data.refresh);
                setRefreshToken(data.refresh);
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setIsAuthenticated(true);
                navigate("/");
                setMessage({
                    code: 200,
                    text: `Willkommen, ${data.user?.first_name} ${data.user?.last_name}`,
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
            Auth.refresh(refreshToken, user.id)
                .then((data) => {
                    setUser(data.user);
                    setIsAuthenticated(true);
                    setAccessToken(data.access);
                    localStorage.setItem("access", data.access);
                    localStorage.setItem("user", JSON.stringify(user));
                })
                .catch(() => {
                    logout();
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
        navigate("/login");
    }

    useEffect(() => {
        if (localStorage.getItem("refresh") !== null && !isAuthenticated && localStorage.getItem("user")) {
            refreshUser();
        }
    }, []);

    return (
        <ProfileContext.Provider value={{user, setUser, isAuthenticated, login, logout, refreshUser}}>
            {props.children}
        </ProfileContext.Provider>
    );
}

const useProfile = () => {
    return useContext(ProfileContext);
};

export {ProfileProvider, useProfile};