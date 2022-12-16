import { Typography, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function NewsPage() {
  const data = useLoaderData();
  const params = useParams();
  const [headline, setHeadline] = useState(undefined)
  const [articles, setArticles] = useState(data.articles || []);
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
      }
    });
    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, []);

  const requestMoreArticles = () => {
    // request new articles from API
    let newArticles = [];
    newArticles = // retrieve new articles from API
    setArticles([...articles, ...newArticles]);
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
