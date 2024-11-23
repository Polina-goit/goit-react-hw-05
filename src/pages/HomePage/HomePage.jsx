import React from "react";
import { fetchMovies } from "../../assets/api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchMovies();
      setMovies(result);
    };

    getData();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
