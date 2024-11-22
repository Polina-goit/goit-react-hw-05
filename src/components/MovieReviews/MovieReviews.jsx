import React, { useEffect, useState } from "react";
import { fetchMovieReview } from "../../assets/api";
import { useParams } from "react-router-dom";

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
        <p>Reviews is not found</p>
      ) : (
        <ul>
          {movieReview.results.map(({ id, author, content }) => (
            <li key={id}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
