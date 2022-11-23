import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useAccount} from "../utils/providers/AccountProvider.jsx";
import {gapi} from "gapi-script";
import {GoogleLogin} from "react-google-login";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, googleLogin} = useAccount();
    const clientId = "336520046482-27egm1na9kpsnru77n8dgbm89a9uoqkn.apps.googleusercontent.com";

    const handleLogin = () => {
        login(email, password);
    }

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });
    const onSuccess = (res) => {
        console.log("success", res);
        googleLogin(res.accessToken, res.googleId, res.tokenId);
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
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
            <Grid item xs={12}>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </Grid>
        </Grid>
    )
}