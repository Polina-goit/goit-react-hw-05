import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovieSearch } from "../../assets/api";
import MovieList from "../../components/MovieList/MovieList";
import { Field, Form, Formik } from "formik";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const initialValues = { query: "" };
  const [query, setQuery] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);

  const request = searchParams.get("query");
  const currentPage = searchParams.get("page");

  const handleSubmit = (values, actions) => {
    setQuery(values.query.toLowerCase().trim());
    actions.resetForm();
  };

  useEffect(() => {
    if (!query) return;
    const fetchSearch = async () => {
      try {
        setLoader(true);
        const { results } = await fetchMovieSearch(query, page);
        setSearchMovies(results);
        setSearchParams(`query=${query}&page=${page}`);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    fetchSearch();
  }, [query, page, setSearchParams, searchParams]);

  useEffect(() => {
    if (request && currentPage) {
      setPage(Number(currentPage));
      setQuery(request);
    }
  }, [request, currentPage]);

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            type="text"
            placeholder="Enter keyword to search..."
            name="query"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {loader && <Loader />}
      <MovieList movies={searchMovies} />
    </div>
  );
};

export default MoviesPage;
