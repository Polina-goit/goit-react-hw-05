import React from "react";
import { fetchMovies } from "../../assets/api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMovies();
      setMovies(result);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Top films</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
