import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";
import {useAccount} from "../utils/providers/AccountProvider.jsx";

export default function RequireAuthRoute(props) {
    const {user, isAuthenticated} = useAccount();
    const location = useLocation();
    if (user) {
        if (props.allowedRoles) {
            if (user?.groups.find(role => props.allowedRoles?.includes(role.name))) {
                return <Outlet/>;
            } else if (isAuthenticated) {
                return <Navigate to="/unauthorized" state={{from: location}} replace/>;
            } else {
                return <Navigate to="/login" state={{from: location}} replace/>;
            }
        } else {
            if (isAuthenticated || user?.pk !== 0) {
                return <Outlet/>;
            }
        }
    } else {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
};