import React from "react";
import {Alert, Snackbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useMessage} from "../utils/providers/MessageProvider";

export default function Message() {
    const {message, setMessage} = useMessage();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setMessage({show: false, status: undefined, text: undefined, code: 0});
    };

    return (
        <Snackbar open={message.show} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={message.status} sx={{width: "100%"}}>
                <Typography>{`${message.text}`}</Typography>
            </Alert>
        </Snackbar>
    );
};