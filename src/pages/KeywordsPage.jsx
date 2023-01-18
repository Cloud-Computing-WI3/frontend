import {Grid, Typography} from "@mui/material";
import MediaCard from "../components/MediaCard";
import {Link, useLoaderData, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ArticlesByKeywords} from "../utils/apis/news_feed/articles_by_keywords.js";
import {ThreeDots} from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import {Accounts} from "../utils/apis/profile_management/accounts.js";
import Button from "@mui/material/Button";

/**
 * The Keywords component is the main body for displaying news articles based on user keywords.
 *
 * @returns {JSX.Element} - A JSX element representing the KeywordsPage, including infinite scrolling and a loading animation.
 */


export default function KeywordsPage() {
    const data = useLoaderData();
    const params = useParams();
    const [articles, setArticles] = useState(data.articles ? data.articles : []);
    const [elasticPointer, setElasticPointer] = useState(data.pointers ? data.pointers : null);
    const location = useLocation()
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setArticles(data.articles ? data.articles : []);
        setElasticPointer(data.pointers ? data.pointers : null);
        // Re-run when data or params change, e.g. when the user navigates to a different page
    }, [data, params]);

    const loadMore = () => {
        Accounts.getKeywords().then(keywords => {
            // Extract the keyword names from the keywords object
            const keywordNames = keywords.map(c => c.name).join(",");
            if (keywordNames.length > 0) {
                // Make GET request to the ArticlesByKeywords API with the given keywords and elastic pointer
                ArticlesByKeywords.get({
                    keywords: keywordNames,
                    elastic_pointer: elasticPointer
                }).then(res => {
                    // Concatenate the new articles with the existing articles state
                    const newArticles = [...articles, ...res.articles]
                    // Update the articles state and the article length state
                    setArticles(newArticles);
                    setElasticPointer(res.elastic_pointer);
                    setHasMore(res.articles.length !== 0);

                }).catch(e => {
                    console.error(e);
                })
            }
        }).catch(e => {
            console.error(e);
        })
    }
    console.log({hasMore});
    return (
        <>
            <Typography variant="h1" sx={{m: 2}}>My keywords</Typography>
            <InfiniteScroll ref={(scroll) => scroll}
                            dataLength={articles.length}
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
                <Grid key={"my-keywords"} container rowSpacing={1}>
                    {
                        articles.length > 0 ?
                            articles.map((article, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <MediaCard key={data.id} {...article}></MediaCard>
                                </Grid>))
                            :
                            <Grid item xs={12}>
                                <Typography>
                                    No articles found. Please make sure you've selected keywords.
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
