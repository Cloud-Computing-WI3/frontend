import { Box, Grid, Typography } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { useLoaderData } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from "react";
import { Articles } from "../utils/apis/news_feed/articles.js";



export default function HomePage() {
    const data = useLoaderData();
    const [new_elastic_pointer, setNewElasticPointer] = useState(data.elastic_pointer);
    const [page, setPage] = useState(1)
    const [articles, setArticles] = useState(data.articles);
    const [headline, setHeadline] = useState(undefined)


    useEffect(() => {
        setHeadline("Top Articles")
        setArticles(data.articles)
        setPage(1)
    }, [data]);

    const loadMore = () => {
        Articles.get({ category_name: "general", elastic_pointer: new_elastic_pointer }).then(res => {
            setArticles([...articles, ...res.articles]);
            setNewElasticPointer(res.elastic_pointer);
            setPage(page + 1)
        }).catch(e => {
            console.error(e);
        })
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h1">Top Articles</Typography>
            <InfiniteScroll ref={(scroll) => scroll}
                dataLength={page * 20}
                next={loadMore}
                hasMore={true}
                loader={
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#000"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{ justifyContent: 'center'}}
                        wrapperClassName=""
                        visible={true}
                    />
                }>
                <Grid key={headline} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4, xlg: 5 }}>
                    {
                        articles.map(article => (
                            <Grid item xs={12} sm={6} md={3} lg={4} key={article.publishedAt}>
                                <MediaCard key={data.id} {...article}></MediaCard>
                            </Grid>))
                    }
                </Grid>
            </InfiniteScroll>
        </Box>
    );
}
