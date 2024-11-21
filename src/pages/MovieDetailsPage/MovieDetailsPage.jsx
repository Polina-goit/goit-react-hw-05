import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMovieById } from "../../assets/api";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieWithId, setMovieWithID] = useState(null);

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
      {!movieWithId ? (
        <p>Loading movie details...</p>
      ) : (
        <div>
          <h2>{movieWithId.title}</h2>
          <img
            src={
              movieWithId && movieWithId.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieWithId.poster_path}`
                : notFoundImage
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
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviewes</NavLink>
          </nav>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
