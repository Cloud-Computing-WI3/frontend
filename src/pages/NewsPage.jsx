import { Typography, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Articles } from "../utils/apis/news_feed/articles.js";
import { ArticlesByKeywords } from "../utils/apis/news_feed/articles_by_keywords.js";
import { ArticlesByCategories } from "../utils/apis/news_feed/articles_by_categories.js";

export default function NewsPage() {
    const data = useLoaderData();
    const params = useParams();
    const [headline, setHeadline] = useState(undefined)
    const [articles, setArticles] = useState(data.articles || []);
    const [new_elastic_pointer, setNewElasticPointer] = useState(data.elastic_pointer || null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (params.categoryName) {
            setHeadline(params.categoryName[0].toUpperCase() + params.categoryName.substring(1))
        } else if (params.keywords) {
            setHeadline(`My keywords (${params.keywords})`)
        } else if (params.categories) {
            setHeadline(`My categories (${params.categories})`)
        }
    });

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                requestMoreArticles();
                console.log("new_elastic_pointer: " + new_elastic_pointer)
            }
        });
        observer.observe(bottomRef.current);

        return () => observer.disconnect();
    }, []);

      

    const requestMoreArticles = () => {
        //load the articles after the first data.elastic_pointer
        //if there is no elastic_pointer, then there are no more articles to load
        if (params.categoryName) {
            Articles.get({ category_name: params.categoryName, elastic_pointer: new_elastic_pointer }).then(res => {
                console.log(res)
                setArticles([...articles, ...res.articles]);
                
                setNewElasticPointer(res.elastic_pointer);     
                           

            }).catch(e => {
                console.log(e);
            })
        } else if (params.keywords) {
            ArticlesByKeywords.get({ keywords: params.keywords, elastic_pointer: new_elastic_pointer }).then(res => {
                console.log(res)
                setArticles([...articles, ...res.articles]);
                setNewElasticPointer(res.elastic_pointer);
                console.log("new_elastic_pointer: " + new_elastic_pointer)
                console.log("resElasticPointer: " + res.elastic_pointer)   
                console.log("data.elastic_pointer: " + data.elastic_pointer)

            }).catch(e => {
                console.log(e);
            })
        } else if (params.categories) {
            ArticlesByCategories.get({ categories: params.categories, elastic_pointer: new_elastic_pointer }).then(res => {
                console.log(res)
                setArticles([...articles, ...res.articles]);
                setNewElasticPointer(res.elastic_pointer);

            }).catch(e => {
                console.log(e);
            })

        }
    };

    return (
        <>
            <Typography variant="h1" sx={{ m: 2 }}>{headline}</Typography>
            <Grid key={headline} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {articles.map(article => (
                    <Grid item xs={12} sm={6} md={3} key={article.publishedAt}>
                        <MediaCard key={data.id} {...article}></MediaCard>
                    </Grid>))
                }
            </Grid>
            <div ref={bottomRef}></div>
        </>
    )
}