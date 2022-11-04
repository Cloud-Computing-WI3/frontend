import React from "react";
import {Typography} from "@mui/material";
import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <>
            <Typography variant="h1">Ooops!</Typography>
            <Typography>Sorry, an unexpected error has occured.</Typography>
            <Typography>
                {error.statusText || error.message}
            </Typography>
        </>
    );
};