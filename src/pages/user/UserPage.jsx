import React from "react";
import { Avatar, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useAccount } from "../../utils/providers/AccountProvider.jsx";
import { useEffect, useState } from "react";
import { Accounts } from "../../utils/apis/profile_management/accounts.js";
import { useMessage } from "../../utils/providers/MessageProvider.jsx";
import { Categories } from "../../utils/apis/profile_management/categories.js";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLoader } from "../../utils/providers/LoadingProvider.jsx";
import { Keywords } from "../../utils/apis/profile_management/keywords.js";
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from "@mui/material/CircularProgress";
import KeywordAutocomplete from "../../components/KeywordAutocomplete.jsx";
import { grey } from "@mui/material/colors";

export default function UserPage() {
    const { user, setUser } = useAccount();
    const { setMessage } = useMessage();
    const { setLoading, isLoading } = useLoader();
    const [categories, setCategories] = useState([]);
    const [keywords, setKeywords] = useState([]);
    useEffect(() => {
        setLoading(true);
        Categories.get()
            .then(categories => {
                setCategories(categories);
            })
        Keywords.get().then(keywords => {
            setKeywords(keywords);
            setLoading(false);
        })

    }, []);
    return (
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
            <Grid item xs={12} container direction="column" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1">User Information</Typography>
                </Grid>
                <Formik
                    initialValues={{
                        given_name: user.given_name,
                        family_name: user.family_name,
                        email: user.email,
                        categories: user.categories,
                        keywords: user.keywords
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setLoading(true);
                        Accounts.save(values, user.id).then(res => {
                            setUser(res);
                            localStorage.setItem("user", JSON.stringify(res));
                            setMessage({
                                show: true,
                                status: "success",
                                text: "Account succesfully saved",
                                code: 200
                            });
                            setLoading(false);
                            setSubmitting(false);
                        }).catch(e => {
                            setMessage({
                                show: true,
                                status: "error",
                                text: e.response.data.detail,
                                code: e.response.status
                            });
                            setLoading(false);
                            setSubmitting(false);
                        });
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
                            isSubmitting,
                        } = props;
                        return (
                            <form onSubmit={(values) => {
                                handleSubmit(values);
                            }
                            } style={{ width: "100%" }}>
                                <Grid item xs={12} container sx={{ display: "flex", alignItems: "center" }}>
                                    <Grid item container xs={12} spacing={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Grid item xs={3} md={3}>
                                            <Avatar src={user.picture} alt="User avatar" sx={{ width: "100%", height: "auto" }} />
                                        </Grid>
                                        <Grid item container xs={9} md={9} spacing={3} sx={{ justifyContent: "flex-end" }}>
                                            <Grid item xs={12}>
                                                <Typography variant="h3">{values.given_name} {values.family_name}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="h6" color={grey[600]} >{values.email}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container direction="column" spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12}>
                                            <Typography variant="h1">My categories</Typography>
                                        </Grid>
                                        <Grid item xs={12} container spacing={2}>
                                            {isLoading ?
                                                <Grid item xs={12}>
                                                    <CircularProgress color="inherit" size={40} />
                                                </Grid>
                                                : null}
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
                                    </Grid>
                                    <Grid item xs={12} container direction="column" spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12}>
                                            <Typography variant="h1">My keywords</Typography>
                                        </Grid>
                                        <Grid item xs={12} container spacing={2}>
                                            <Grid item xs={12}>
                                                <KeywordAutocomplete onChange={(value) => setFieldValue("keywords", value)} keywords={keywords} userKeywords={user.keywords} />
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sx={{ mt: 3 }}>
                                        <Button disabled={isSubmitting} size="large" variant="contained" color="primary"
                                            type="submit">Save
                                            account</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        );
                    }}
                </Formik>
            </Grid>
        </Grid >
    )
}