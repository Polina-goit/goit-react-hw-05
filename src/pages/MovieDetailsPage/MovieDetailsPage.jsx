import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieById } from "../../assets/api";
// import GoBackLink from "../../components/GoBackLink/GoBackLink";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieWithId, setMovieWithID] = useState(null);
  const location = useLocation();
  const linkToBack = location.state?.from ?? "/";
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

  return (
    <div>
      <Link to={linkToBack}>
        <button>GO BACK</button>
      </Link>
      {!movieWithId ? (
        <p>Loading movie details...</p>
      ) : (
        <div>
          <h2>{movieWithId.title}</h2>
          <img
            src={
              movieWithId && movieWithId.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieWithId.poster_path}`
                : "notFoundImage"
            }
            alt={movieWithId.title}
            width="350"
            height="500"
          />
          <h3>Overview</h3>
          <p>{movieWithId.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movieWithId.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <nav>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviewes</Link>
          </nav>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
