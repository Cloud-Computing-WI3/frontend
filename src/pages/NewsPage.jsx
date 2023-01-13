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
import { Accounts } from "../utils/apis/profile_management/accounts.js";

export default function NewsPage() {
    const data = useLoaderData();
    const params = useParams();
    const [headline, setHeadline] = useState(undefined)
    const [articles, setArticles] = useState(data.articles || []);
    const [new_elastic_pointer, setNewElasticPointer] = useState(data.elastic_pointer);
    const [articleLen, setArticleLen] = useState(data.articles.length || 0)
    const location = useLocation()

    useEffect(() => {
        if (params.categoryName) {
            setHeadline(params.categoryName[0].toUpperCase() + params.categoryName.substring(1))
            setArticleLen(data.articles.length)
            setArticles(data.articles)
            setNewElasticPointer(data.elastic_pointer)
        } else if (location.pathname === '/my/keywords') {
            setHeadline(`My keywords`)
            setArticleLen(data.articles.length)
            setArticles(data.articles)
            setNewElasticPointer(data.elastic_pointer)
        } else if (location.pathname === '/my/categories') {
            setHeadline(`My categories`)
            setArticleLen(data.articles.length)
            setArticles(data.articles)
            setNewElasticPointer(data.pointers)
        }
    }, [data, params]);


    const loadMore = () => {
    if (params.categoryName) {
        Articles.get({category_name: params.categoryName, elastic_pointer: new_elastic_pointer}).then(res => {
            const newArticles = [...articles, ...res.articles]
            setArticles(newArticles);
            setArticleLen(newArticles.length)
            setNewElasticPointer(res.elastic_pointer);
        }).catch(e => {
            console.error(e);
        })
    } else if (location.pathname === '/my/keywords') {
        Accounts.getKeywords().then(keywords => {
            const keywordNames = keywords.map(c => c.name).join(",");
            if (keywordNames.length > 0) {
                ArticlesByKeywords.get({
                    keywords: keywordNames,
                    elastic_pointer: new_elastic_pointer
                }).then(res => {
                    const newArticles = [...articles, ...res.articles]
                    setArticleLen(newArticles.length)
                    setArticles(newArticles);
                    setNewElasticPointer(res.elastic_pointer);
                }).catch(e => {
                    console.log(e);
                })
            }
        }).catch(e => {
            console.log(e);
        })
    } else if (location.pathname === '/my/categories') {
        const nextBatchObject = Object.entries(new_elastic_pointer).map(([name, pointer]) => ({name, pointer}))
        ArticlesByCategories.get(nextBatchObject).then(res => {
            const newArticles = [...articles, ...res.articles]
            setArticleLen(newArticles.length)
            setArticles(newArticles);
            setNewElasticPointer(res.pointers);
        }).catch(e => {
            console.log(e);
        })

    }
}

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
                        articles.map(article => (
                            <Grid item xs={12} sm={6} md={3} lg={4} key={article.publishedAt}>
                                <MediaCard key={data.id} {...article}></MediaCard>
                            </Grid>))
                    }
                </Grid>
            </InfiniteScroll>
        </>
    )
}
