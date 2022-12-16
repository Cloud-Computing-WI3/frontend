import { Typography, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import {useLoaderData, useParams} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import Pagination from "react-pagination-js";

export default function NewsPage() {
    const data = useLoaderData();
    const params = useParams();
    const [headline, setHeadline] = useState(undefined);
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
    if (params.categoryName) {
        setHeadline(params.categoryName[0].toUpperCase() + params.categoryName.substring(1))
    } else if (params.keywords) {
        setHeadline(`My keywords (${params.keywords})`)
    } else if (params.categories) {
        setHeadline(`My categories (${params.categories})`)
    }});

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    return (
        <>
            <Typography variant="h1" sx={{ m: 2 }}>{headline}</Typography>
            <Grid key={headline} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {data.articles && data.articles.slice(startIndex, endIndex).map(article => (
                    <Grid item xs={12} sm={6} md={3} key={article.publishedAt}>
                        <MediaCard key={data.id} {...article}></MediaCard>
                    </Grid>))
                }
            </Grid>
            <Pagination
                currentPage={page}
                totalSize={data.articles.length}
                sizePerPage={itemsPerPage}
                changeCurrentPage={handlePageChange}
            />
        </>
    )
}