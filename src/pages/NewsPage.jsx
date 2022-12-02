import { Typography, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import {useLoaderData, useParams} from "react-router-dom";

export default function NewsPage() {
    const data = useLoaderData();
    const params = useParams();
    return (
        <>
            <Typography variant="h1" sx={{ m: 2 }}>{params.categoryName[0].toUpperCase() + params.categoryName.substring(1)}</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {data.articles && data.articles.map(article => (
                    <Grid item xs={12} sm={6} md={3} key={article.publishedAt}>
                        <MediaCard key={data.id} {...article}></MediaCard>
                    </Grid>))
                }
            </Grid>
        </>
    )
}