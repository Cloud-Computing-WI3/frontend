import {Avatar, Grid, TextField, Typography} from "@mui/material";
import {useProfile} from "../../utils/providers/ProfileProvider";
import {useEffect, useState} from "react";
import {Profiles} from "../../utils/api/routes/profiles";
import {AccountCircle} from "@mui/icons-material";

export default function UserPage() {
    const {user} = useProfile();
    const [profile, setProfile] = useState({});
    useEffect(() => {
        Profiles.get(user.id)
            .then(res => {
                console.log(res);
                console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
            })
    })
    return (
        <Grid container spacing={2} sx={{alignItems: "center"}}>
            <Grid item xs={4}>
                <img src={user.avatar} width="100%" alt="User avatar" />
            </Grid>
            <Grid item container xs={8} spacing={3}>
                <Grid item xs={12}>
                    <TextField value={user.first_name} label="First name" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField value={user.last_name} label="Last name" fullWidth />
                </Grid>
            </Grid>
        </Grid>
    )
}