import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";
import {useAccount} from "../utils/providers/AccountProvider.jsx";

/**
 * Component for requiring authentication for a specific route.
 * Utilizes the useAccount hook for checking the authentication status of the user and the useLocation hook
 * for redirecting the user to the login page if they are not authenticated.
 *
 * Props:
 * allowedRoles: array of roles that are allowed to access the route. If this prop is provided
 * and the user's role is not included, they will be redirected to the unauthorized page.
 */


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