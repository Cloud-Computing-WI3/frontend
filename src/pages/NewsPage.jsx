import {Grid, Link, Typography} from "@mui/material";
import MediaCard from "../components/MediaCard";
import {useLoaderData, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useLoader} from "../utils/providers/LoadingProvider.jsx";

export default function NewsPage(props) {
    const data = useLoaderData();
    const params = useParams();
    const [headline, setHeadline] = useState()
    useEffect(() => {
        if (params.categoryName) {
            setHeadline(params.categoryName[0].toUpperCase() + params.categoryName.substring(1))
        }
    });
    return (
        <>
            <Typography variant="h1" sx={{m: 2}}>{props.title ? props.title : headline ? headline : ""}</Typography>
            <Grid key={headline} container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                {data && data.articles && data.articles.length > 0 ? data.articles.map(article => (
                        <Grid item xs={12} sm={6} md={3} key={article.id}>
                            <MediaCard key={data.id} {...article}></MediaCard>
                        </Grid>))
                    : <Grid item xs={12}>
                        <Typography variant="h6">No articles found.</Typography>
                        <Typography>Please make sure you've selected your keywords <Link
                            to={"/user"}>here</Link>.</Typography>
                    </Grid>
                }
            </Grid>
        </>
    )
}