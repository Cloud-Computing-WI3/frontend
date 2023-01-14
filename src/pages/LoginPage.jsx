import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useAccount} from "../utils/providers/AccountProvider.jsx";
import {gapi} from "gapi-script";
import {GoogleLogin} from "@leecheuk/react-google-login";
import "./LoginPage.css"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, googleLogin, googleClientId, user} = useAccount();


    const handleLogin = () => {
        login(email, password);
    }

    useEffect(() => {
        if (!user) {
            const initClient = () => {
                gapi.client.init({
                    clientId: googleClientId,
                    scope: "https://www.googleapis.com/auth/userinfo.profile"
                });
            };
            gapi.load('client:auth2', initClient);
        }
    });
    const onSuccess = (res) => {
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
                <TextField label="E-Mail" variant="outlined" name="email" type="email" fullWidth
                           onChange={(e) => setEmail(e.target.value)} value={email}/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Password" variant="outlined" name="password" type="password" fullWidth
                           onChange={(e) => setPassword(e.target.value)} value={password}/>
            </Grid>
            <Grid item xs={12} container spacing={2} sx={{justifyContent: {xs: "space-between", md: "center"}}}>
                <Grid item>
                    <Link className="link" to="/register">No account yet? Sign Up!</Link>
                </Grid>

            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" className="login-button" onClick={handleLogin} fullWidth>Login</Button>
            </Grid>
            <Grid item xs={12}>
                <GoogleLogin
                    className="google-login"
                    clientId={googleClientId}
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