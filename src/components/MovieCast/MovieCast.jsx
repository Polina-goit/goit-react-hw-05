import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../assets/api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);

  useEffect(() => {
    const MovieCredits = async () => {
      try {
        const cast = await fetchMovieCast(movieId);
        setMovieCast(cast);
      } catch (err) {
        console.error(err);
      }
    };
    MovieCredits();
  }, [movieId]);

  return (
    <div>
      {!movieCast || movieCast.cast.length === 0 ? (
        <p>Casts is not found</p>
      ) : (
        <ul>
          {movieCast.cast.map(({ id, name, profile_path, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : "notFoundImage"
                }
                alt={name}
              />
              <span>
                <p>{name}</p>
                <p>Character: {character}</p>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
