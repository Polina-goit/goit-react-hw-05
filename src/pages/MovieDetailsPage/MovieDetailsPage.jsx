import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieById } from "../../assets/api";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
// import GoBackLink from "../../components/GoBackLink/GoBackLink";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieWithId, setMovieWithID] = useState(null);
  const location = useLocation();
  const linkToBack = useRef(location.state?.from ?? "/");
  useEffect(() => {
    const fetchMovieWithId = async () => {
      try {
        const movie = await fetchMovieById(movieId);
        setMovieWithID(movie);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovieWithId();
  }, [movieId]);
  const userScore = movieWithId
    ? (Number(movieWithId.vote_average) * 10).toFixed(0)
    : null;

  return (
    <section className={css.movieDetails}>
      <Link to={linkToBack.current}>
        <button className={css.LinkGoBack}>GO BACK</button>
      </Link>
      {!movieWithId ? (
        <Loader />
      ) : (
        <div className={css.movieDetailsSection}>
          <section className={css.movieDetailsWrap}>
            <img
              className={css.movieDetailsImg}
              src={
                movieWithId && movieWithId.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieWithId.poster_path}`
                  : "notFoundImage"
              }
              alt={movieWithId.title}
              width="350"
              height="500"
            />
            <div>
              <h2 className={css.movieDetailsTitle}>{movieWithId.title}</h2>
              {userScore !== "0" && userScore !== null && (
                <div>
                  <p>
                    <span className={css.movieDetailsAccent}>User Score:</span>{" "}
                    {userScore}&#37;
                  </p>{" "}
                </div>
              )}
              <div className={css.movieDetailsGenres}>
                <h3 className={css.movieDetailsText}>Overview: </h3>
                <p className={css.movieDetailsText}>{movieWithId.overview}</p>
              </div>
              <div className={css.movieDetailsGenres}>
                <h3 className={css.movieDetailsText}>Genres: </h3>
                <ul className={css.movieDetailsList}>
                  {movieWithId.genres.map((genre) => (
                    <li className={css.movieDetailsText} key={genre.id}>
                      {genre.name},
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <h4>Additional information:</h4>
          <nav className={css.DetailsNav}>
            <Link className={css.movieDetailsCast} to="cast">
              Cast
            </Link>
            <Link className={css.movieDetailsReviewes} to="reviews">
              Reviewes
            </Link>
          </nav>
          <Outlet />
        </div>
      )}
    </section>
  );
};

export default MovieDetailsPage;
