import Typography from "@mui/material/Typography";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMessage} from "../utils/providers/MessageProvider";
import {useNavigate} from "react-router-dom";
import {Avatar, Button, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {Auth} from "../utils/apis/profile_management/authentication.js";


export default function RegisterPage() {
    const [filePreview, setFilePreview] = useState("");
    const {setMessage} = useMessage();
    const navigate = useNavigate();

    const registrationForm = useFormik({
        initialValues: {
            given_name: "", family_name: "", email: "", password: "", password2: ""
        }, validationSchema: Yup.object({
            given_name: Yup.string().required("Required"),
            family_name: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            password1: Yup.string().required("Required").oneOf([Yup.ref("password2"), null], "Passwords must match"),
            password2: Yup.string().required("Required").oneOf([Yup.ref("password1"), null], "Passwords must match"),
        }), onSubmit: (values) => {
            const formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
            }
            Auth.register(formData).then(res => {
                setMessage({status: "success", code: 200, show: true, text: "Registration successfull!"});
                navigate("/login");
            }).catch(e => {
                const res = e.response.data;
                for (const [key, value] of Object.entries(res)) {
                    registrationForm.setFieldError(key, value);
                }

            });
        },
    });
    return (<>
        <Typography variant="h1">Register</Typography>
        <form onSubmit={registrationForm.handleSubmit}>
            <Grid item container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name="given_name"
                        type="text"
                        label="First name"
                        onChange={registrationForm.handleChange}
                        value={registrationForm.values.given_name}
                        error={!!registrationForm.errors.given_name}
                        helperText={registrationForm.errors.given_name}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="family_name"
                        type="text"
                        label="Last name"
                        onChange={registrationForm.handleChange}
                        value={registrationForm.values.family_name}
                        error={!!registrationForm.errors.family_name}
                        helperText={registrationForm.errors.family_name}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        type="email"
                        label="E-Mail"
                        onChange={registrationForm.handleChange}
                        value={registrationForm.values.email}
                        error={!!registrationForm.errors.email}
                        helperText={registrationForm.errors.email}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="password1"
                            type="password"
                            label="Password"
                            onChange={registrationForm.handleChange}
                            value={registrationForm.values.password1}
                            error={!!registrationForm.errors.password1}
                            helperText={registrationForm.errors.password1}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="password2"
                            type="password"
                            label="Confirm Password"
                            onChange={registrationForm.handleChange}
                            value={registrationForm.values.password2}
                            error={!!registrationForm.errors.password2}
                            helperText={registrationForm.errors.password2}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} container sx={{justifyContent: "center", alignItems: "center", mt: 1}}
                      direction="column" spacing={2}>
                    <Grid item>
                        <Avatar sx={{width: 150, height: 150}} src={filePreview}/>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload Avatar
                            <input
                                type="file"
                                hidden
                                onChange={(e) => {
                                    if (e.target.files) {
                                        const objectUrl = URL.createObjectURL(e.target.files[0]);
                                        setFilePreview(objectUrl);
                                        registrationForm.setFieldValue("avatar", e.target.files[0]);
                                    }
                                }}
                            />
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} container sx={{justifyContent: "center", alignItems: "center", mt: 2}}>
                    <Grid item>
                        <Button variant="contained" type="submit">Register</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>

    </>)
}