import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovieSearch } from "../../assets/api";
import MovieList from "../../components/MovieList/MovieList";
import { Field, Form, Formik } from "formik";
import Loader from "../../components/Loader/Loader";
import css from "./MoviesPage.module.css";
const MoviesPage = () => {
  const initialValues = { query: "" };
  const [query, setQuery] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);

  const request = searchParams.get("query") ?? "";
  const currentPage = searchParams.get("page") ?? 1;

  const handleSubmit = (values, actions) => {
    // setQuery(values.query.toLowerCase().trim());
    setSearchParams({ query: values.query.trim().toLowerCase(), page: 1 });
    actions.resetForm();
  };

  useEffect(() => {
    // if (!query) return;
    const fetchSearch = async () => {
      try {
        setLoader(true);
        const { results } = await fetchMovieSearch(request, currentPage);
        setSearchMovies(results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    fetchSearch();
  }, [request, currentPage]);

  //   useEffect(() => {
  //     if (request && currentPage) {
  //       setPage(Number(currentPage));
  //       setQuery(request);
  //     }
  //   }, [request, currentPage]);

  return (
    <div className={css.moviesPage}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.formInput}
            type="text"
            placeholder="Enter keyword to search..."
            name="query"
          />
          <button className={css.formButton} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      {loader && <Loader />}
      <MovieList movies={searchMovies} />
    </div>
  );
};

export default MoviesPage;
