import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

const MovieCard = ({ movie }) => {
  const downloadPoster = () => {
    fetch(movie.Poster)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${movie.Title}_poster.png`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Card>
      <img src={movie.Poster} alt={movie.Title} style={{ width: "100%" }} />
      <CardContent>
        <Typography variant="h6" component="div">
          {movie.Title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={downloadPoster}>
          Download Poster
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
