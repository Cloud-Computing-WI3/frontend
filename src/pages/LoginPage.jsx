import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useProfile} from "../utils/providers/ProfileProvider";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useProfile();

    const handleLogin = () => {
        login(email, password);
    }

    return (
        <Grid container sx={{justifyContent: "center", alignItems: {xs: "inherit", md: "center"}}} direction="column"
              spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1">
                    Login
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField label="E-Mail" variant="outlined" name="email" type="email" fullWidth onChange={(e) => setEmail(e.target.value)} value={email} />
            </Grid>
            <Grid item xs={12}>
                <TextField label="Password" variant="outlined" name="password" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} value={password}/>
            </Grid>
            <Grid item xs={12} container spacing={2} sx={{justifyContent: {xs: "space-between", md: "center"}}}>
                <Grid item>
                    <Link to="/register">No account yet? Sign Up!</Link>
                </Grid>
                <Grid item>
                    <Link to="#">Forgot password?</Link>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={handleLogin} fullWidth>Login</Button>
            </Grid>
        </Grid>
    )
}