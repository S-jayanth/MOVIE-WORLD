import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MovieCard from "./MovieCard";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`)
      .then((response) => response.json())
      .then((value) => {
        if (value.Response === "True") {
          setData(value.Search || []);
        } else {
          setError(value.Error || "Movie not found");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError("An error occurred. Please try again later.");
        setIsLoading(false);
      });
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{ color: "blue" }}
        >
          Search Your Favorite Movie
        </Typography>
        <form onSubmit={submitHandler} style={{ textAlign: "center" }}>
          <TextField
            label="Movie Title"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </Box>
        </form>
      </Box>

      {isLoading ? (
        <Typography
          variant="h5"
          align="center"
          mt={4}
          style={{ color: "green" }}
        >
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="h5" align="center" mt={4} style={{ color: "red" }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={2} mt={4}>
          {data.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;
