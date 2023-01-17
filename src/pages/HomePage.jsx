import {Box, Grid, Typography} from "@mui/material";
import MediaCard from "../components/MediaCard";
import {useLoaderData} from "react-router-dom";
import {ThreeDots} from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import {useState, useEffect} from "react";
import {Articles} from "../utils/apis/news_feed/articles.js";

/**
 * The HomePage component displays a list of top news articles.
 * It uses the `InfiniteScroll` component to implement infinite scrolling and loading animation.
 * It also uses the `useLoaderData` hook from the `react-router-dom` library to load data from an API.
 */

export default function HomePage() {
    const data = useLoaderData();
    const [new_elastic_pointer, setNewElasticPointer] = useState(data.elastic_pointer);
    const [articles, setArticles] = useState(data.articles);
    const [articleLen, setArticleLen] = useState(data.articles.length || 0)
    const [headline, setHeadline] = useState(undefined)
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        // Set the headline and articles state when the data changes
        setHeadline("Top Articles")
        setArticles(data.articles)
        setArticleLen(data.articles.length)
    }, [data]);

    const loadMore = () => {
        // Make a GET request to the Articles API for the "general" category and the current elastic pointer
        Articles.get({category_name: "general", elastic_pointer: new_elastic_pointer}).then(res => {
            // Concatenate the new articles with the existing articles state
            setArticles([...articles, ...res.articles]);
            setArticleLen(prevState => prevState + res.articles.length);
            setNewElasticPointer(res.elastic_pointer);
            if (res.articles.length === 0) {
                setHasMore(false);
            }
        }).catch(e => {
            console.error(e);
        })
    }
    return (
        <Box sx={{p: 2}}>
            <Typography variant="h1">Top Articles</Typography>
            <InfiniteScroll ref={(scroll) => scroll}
                            dataLength={articleLen}
                            next={loadMore}
                            hasMore={hasMore}
                            loader={
                                <ThreeDots
                                    height="80"
                                    width="80"
                                    radius="9"
                                    color="#000"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{justifyContent: 'center'}}
                                    wrapperClassName=""
                                    visible={hasMore}
                                />
                            }>
                <Grid key={headline} container rowSpacing={1}>
                    {
                        articles.map(article => (
                            <Grid item xs={12} sm={6} md={3} key={article.publishedAt}>
                                <MediaCard key={data.id} {...article}></MediaCard>
                            </Grid>))
                    }
                </Grid>
            </InfiniteScroll>
        </Box>
    );
}
