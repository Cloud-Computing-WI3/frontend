import { Typography, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Articles } from "../utils/apis/news_feed/articles.js";
import { ArticlesByKeywords } from "../utils/apis/news_feed/articles_by_keywords.js";
import { ArticlesByCategories } from "../utils/apis/news_feed/articles_by_categories.js";
import { ThreeDots } from  'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function NewsPage() {
    const data = useLoaderData();
    const params = useParams();
    const [headline, setHeadline] = useState(undefined)
    const [articles, setArticles] = useState(data.articles || []);
    const [new_elastic_pointer, setNewElasticPointer] = useState(data.elastic_pointer || null);
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (params.categoryName) {
            setHeadline(params.categoryName[0].toUpperCase() + params.categoryName.substring(1))
            setArticles(data.articles)
            setPage(1)
        } else if (params.keywords) {
            setHeadline(`My keywords (${params.keywords})`)
            setArticles(data.articles)
            setPage(1)
        } else if (params.categories) {
            setHeadline(`My categories (${params.categories})`)
            setArticles(data.articles)
            setPage(1)
        }
    }, [params]);

    const loadMore = () => {
         if (params.categoryName) {
            Articles.get({ category_name: params.categoryName, elastic_pointer: new_elastic_pointer }).then(res => {
                setArticles([...articles, ...res.articles]);
                setNewElasticPointer(res.elastic_pointer);
                setPage(page+1)
            }).catch(e => {
                console.error(e);
            })
        } else if (params.keywords) {
            ArticlesByKeywords.get({ keywords: params.keywords, elastic_pointer: new_elastic_pointer }).then(res => {
                setArticles([...articles, ...res.articles]);
                setNewElasticPointer(res.elastic_pointer);
                setPage(page+1)
            }).catch(e => {
                console.error(e);
            })
        } else if (params.categories) {
            ArticlesByCategories.get({ categories: params.categories, elastic_pointer: new_elastic_pointer }).then(res => {
                console.log(res)
                setArticles([...articles, ...res.articles]);
                setNewElasticPointer(res.elastic_pointer);
                setPage(page+1)
            }).catch(e => {
                console.error(e);
            })
        }
    };

    return (
        <>
            <Typography variant="h1" sx={{ m: 2 }}>{headline}</Typography>
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
                <Grid key={headline} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        articles.map(article => (
                            <Grid item xs={12} sm={6} md={3} key={article.publishedAt}>
                                <MediaCard key={data.id} {...article}></MediaCard>
                            </Grid>))
                    }
                </Grid>
            </InfiniteScroll>
        </>
    )
}
