import {Grid, Typography} from "@mui/material";
import MediaCard from "../components/MediaCard";
import {Link, useLoaderData, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Articles} from "../utils/apis/news_feed/articles.js";
import {ArticlesByKeywords} from "../utils/apis/news_feed/articles_by_keywords.js";
import {ArticlesByCategories} from "../utils/apis/news_feed/articles_by_categories.js";
import {ThreeDots} from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import {Accounts} from "../utils/apis/profile_management/accounts.js";
import Button from "@mui/material/Button";

/**
 * The CategoriesPage component is the main body for displaying news articles.
 * It currently supports three different content types:
 *
 * - Articles grouped by category
 * - Articles for custom categories
 *
 * @returns {JSX.Element} - A JSX element representing the CategoriesPage, including infinite scrolling and a loading animation.
 */


export default function CategoriesPage() {
    const data = useLoaderData();
    const params = useParams();
    const [headline, setHeadline] = useState(undefined)
    const [articles, setArticles] = useState(data.articles ? data.articles : []);
    const [new_elastic_pointer, setNewElasticPointer] = useState(data.pointers ? data.pointers : null);
    const [articleLen, setArticleLen] = useState(data.articles ? data.articles.length : 0)
    const location = useLocation()
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        window.scrollTo(0,0);
        // Set the configuration based on the type of endpoint
        if (params.categoryName) { // case 1: read_articles endpoint
            setHeadline(params.categoryName[0].toUpperCase() + params.categoryName.substring(1))
        } else if (location.pathname === '/my/keywords') { // case 2: get_articles_by_keywords endpoint
            setHeadline(`My keywords`)
        } else if (location.pathname === '/my/categories') { // case 3: get_articles_by_categories endpoint
            setHeadline(`My categories`)
        }
        setArticles(data.articles ? data.articles : []);
        setNewElasticPointer(data.pointers ? data.pointers : null);
        setArticleLen(data.articles ? data.articles.length : 0);
        setHasMore(data.articles ? true : false);
        // Re-run when data or params change, e.g. when the user navigates to a different page
    }, [data, params]);

    const loadMore = () => {
        // Check if the request is for articles by category
        if (params.categoryName) {
            // Make GET request to the Articles API with the given category and elastic pointer
            Articles.get({category_name: params.categoryName, elastic_pointer: new_elastic_pointer}).then(res => {
                // Concatenate the new articles with the existing articles state
                const newArticles = [...articles, ...res.articles]
                // Update the articles state and the article length state
                setArticles(newArticles);
                setArticleLen(prevState => prevState + res.articles.length);
                setNewElasticPointer(res.elastic_pointer);
                setHasMore(res.articles.length !== 0);

            }).catch(e => {
                console.error(e);
            })
            // Check if the request is for articles by user categories
        } else if (location.pathname === '/my/categories') {
            // create an array of objects with category name and pointer
            if (new_elastic_pointer !== null && new_elastic_pointer !== undefined) {
                const nextBatchObject = Object.entries(new_elastic_pointer).map(([name, pointer]) => ({name, pointer}))
                ArticlesByCategories.get(nextBatchObject).then(res => {
                    // Concatenate the new articles with the existing articles state
                    const newArticles = [...articles, ...res.articles]
                    // Update the articles state and the article length state
                    setArticleLen(prevState => prevState + res.articles.length);
                    setArticles(newArticles);
                    setNewElasticPointer(res.pointers);
                    setHasMore(res.articles.length !== 0);

                }).catch(e => {
                    console.log(e);
                })
            }else {

            }

        }
    }

    return (
        <>
            <Typography variant="h1" sx={{m: 2}}>{headline}</Typography>
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
                        articles.length > 0 ?
                            articles.map((article, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <MediaCard key={data.id} {...article}></MediaCard>
                                </Grid>))
                            :
                            <Grid item xs={12}>
                                <Typography>
                                    No articles found. Please make sure you've selected categories.
                                </Typography>
                                <Button
                                    component={Link}
                                    to={"/user"}
                                    size="small"
                                    variant={"contained"}
                                    sx={{mt: 1}}
                                >
                                    Go to Settings
                                </Button>
                            </Grid>
                    }
                </Grid>
            </InfiniteScroll>
        </>
    )
}
