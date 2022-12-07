import {Avatar, Button, Chip, Grid, TextField, Typography} from "@mui/material";
import {useAccount} from "../../utils/providers/AccountProvider.jsx";
import {useEffect, useState} from "react";
import {Accounts} from "../../utils/apis/profile_management/accounts.js";
import {useMessage} from "../../utils/providers/MessageProvider.jsx";
import {Categories} from "../../utils/apis/profile_management/categories.js";
import {Formik} from "formik";
import * as Yup from "yup";

export default function UserPage() {
    const {user, setUser} = useAccount();
    const {setMessage} = useMessage();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        Categories.get()
            .then(categories => {
                setCategories(categories);
            })
        console.log({user});
    }, []);
    return (
        <Grid container spacing={4} sx={{alignItems: "center"}}>
            <Grid item xs={12} container direction="column" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1">User Information</Typography>
                </Grid>
                <Grid item xs={12} container>
                    <Formik
                        initialValues={{
                            given_name: user.given_name,
                            family_name: user.family_name,
                            email: user.email,
                            categories: user.categories
                        }}
                        onSubmit={values => {
                            Accounts.save(values, user.id).then(res => {
                                setUser(res);
                                localStorage.setItem("user", JSON.stringify(res));
                                setMessage({show: true, status: "success", text: "Account succesfully saved", code: 200});
                            }).catch(e => console.log(e));
                        }}
                        validationSchema={Yup.object({
                            given_name: Yup.string().required("Required"),
                            family_name: Yup.string().required("Required"),
                        })}
                    >
                        {(props) => {
                            const {
                                values,
                                setFieldValue,
                                errors,
                                handleSubmit,
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <Grid item xs={3} md={1}>
                                        <Avatar src={user.picture} alt="User avatar"
                                                sx={{width: "100%", height: "auto"}}/>
                                    </Grid>
                                    <Grid item container xs={9} md={11} spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField value={values.given_name} label="First name" fullWidth/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField value={values.family_name} label="Last name" fullWidth/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField value={values.email} fullWidth type="email"
                                                       InputProps={{
                                                           readOnly: true,
                                                       }} disabled/>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h1">My categories</Typography>
                                        </Grid>
                                        <Grid item xs={12} container spacing={2}>
                                            {categories && categories.map(category => (
                                                <Grid item key={category.id}>
                                                    <Chip
                                                        label={category.name}
                                                        onClick={(event) => {
                                                            const cat = categories.filter(c => c.id === category.id)[0];
                                                            if (!values.categories.some(c => c.id === cat.id)) {
                                                                if (values.categories.length > 0) {
                                                                    setFieldValue("categories", [...values.categories, cat]);
                                                                } else {
                                                                    setFieldValue("categories", [cat]);
                                                                }
                                                            } else {
                                                                setFieldValue("categories", values.categories.filter(c => c.id !== cat.id));
                                                            }
                                                        }}
                                                        color={values.categories.some(c => c.id === category.id) ? "primary" : undefined}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button size="large" variant="contained" type="submit">Save
                                                account</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            );
                        }}
                    </Formik>
                </Grid>
            </Grid>

        </Grid>
    )
}