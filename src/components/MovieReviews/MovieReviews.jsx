import React, { useEffect, useState } from "react";
import { fetchMovieReview } from "../../assets/api";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReview, setMovieReview] = useState(null);

  useEffect(() => {
    const fetchReviwes = async () => {
      try {
        const reviewes = await fetchMovieReview(movieId);
        setMovieReview(reviewes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviwes();
  }, [movieId]);

  return (
    <div>
      {!movieReview || movieReview.results.length === 0 ? (
        <p className={css.info}>We dont't have any reviewes for this movie</p>
      ) : (
        <ul className={css.reviewsList}>
          {movieReview.results.map(({ id, author, content }) => (
            <li className={css.reviewsItem} key={id}>
              <h3 className={css.reviewsAuthor}>Author: {author}</h3>
              <p className={css.reviewComment}>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
