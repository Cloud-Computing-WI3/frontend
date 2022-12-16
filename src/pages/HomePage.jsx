import { Box, Grid, Typography } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { useLoaderData } from "react-router-dom";

export default function HomePage() {
  const data = useLoaderData();
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h1">Top Articles</Typography>
      {data ? (
        <Grid container spacing={2}>
          {data.articles.map(article => (
            <Grid item xs={12} sm={6} md={3} key={article.publishedAt}>
              <MediaCard key={data.id} {...article} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No articles to show.</Typography>
      )}
    </Box>
  );
}
