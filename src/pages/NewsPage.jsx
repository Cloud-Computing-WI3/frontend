import { Typography, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Articles } from "../utils/apis/news_feed/articles.js";
import { ArticlesByKeywords } from "../utils/apis/news_feed/articles_by_keywords.js";
import { ArticlesByCategories } from "../utils/apis/news_feed/articles_by_categories.js";
import { ThreeDots } from  'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from "react-router-dom";

export default function NewsPage() {
    const data = useLoaderData();
    const params = useParams();
    const [headline, setHeadline] = useState(undefined)
    const [articles, setArticles] = useState(data.articles || []);
    const [new_elastic_pointer, setNewElasticPointer] = useState(data.elastic_pointer || null);
    const [articleLen, setArticleLen] = useState(0)
    const location = useLocation()


    function useFilterArticles(articles) {
        const [filteredArticles, setFilteredArticles] = useState([]);

        useEffect(() => {
            if (articles !== undefined) {
                const publishedAtSet = new Set(articles.map(object => object.publishedAt));
                const filteredArticles = [];
                for (const article of articles) {
                    if (publishedAtSet.has(article.publishedAt)) {
                        filteredArticles.push(article);
                        publishedAtSet.delete(article.publishedAt);
                    }
                }
                setFilteredArticles(filteredArticles);
                setArticleLen(filteredArticles.length)
            }
            }, [articles]);
        return filteredArticles;
    }

    useEffect(() => {
        if (params.categoryName) {
            setHeadline(params.categoryName[0].toUpperCase() + params.categoryName.substring(1))
            setArticles(data.articles)
        } else if (location.pathname === '/my/keywords') {
            setHeadline(`My keywords`)
            setArticles(data.articles)
        } else if (location.pathname === '/my/categories') {
            setHeadline(`My categories`)
            setArticles(data.articles)
        }
    }, [data, params]);


    const loadMore = () => {
         if (params.categoryName) {
            Articles.get({ category_name: params.categoryName, elastic_pointer: new_elastic_pointer }).then(res => {
                setArticles([...articles, ...res.articles]);
                setNewElasticPointer(res.elastic_pointer);
            }).catch(e => {
                console.error(e);
            })
        } else if (location.pathname === '/my/keywords') {
            ArticlesByKeywords.get({ keywords: params.keywords, elastic_pointer: new_elastic_pointer }).then(res => {
                setArticles([...articles, ...res.articles]);
                setNewElasticPointer(res.elastic_pointer);
            }).catch(e => {
                console.error(e);
            })
        } else if (location.pathname === '/my/categories') {
            ArticlesByCategories.get({ categories: params.categories, elastic_pointer: new_elastic_pointer }).then(res => {
                setArticles([...articles, ...res.articles]);
                setNewElasticPointer(res.elastic_pointer);
            }).catch(e => {
                console.error(e);
            })
        }
    };

    return (
        <>
            <Typography variant="h1" sx={{ m: 2 }}>{headline}</Typography>
            <InfiniteScroll ref={(scroll) => scroll}
                dataLength={articleLen}
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
                        useFilterArticles(articles).map(article => (
                            <Grid item xs={12} sm={6} md={3} lg={4} key={article.publishedAt}>
                                <MediaCard key={data.id} {...article}></MediaCard>
                            </Grid>))
                    }
                </Grid>
            </InfiniteScroll>
        </>
    )
}
