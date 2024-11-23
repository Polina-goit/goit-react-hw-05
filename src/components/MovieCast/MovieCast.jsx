import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../assets/api";
import css from "./MovieCast.module.css";
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
        <p className={css.info}>Casts is not found</p>
      ) : (
        <ul className={css.castList}>
          {movieCast.cast.map(({ id, name, profile_path, character }) => (
            <li className={css.castItem} key={id}>
              <img
                className={css.castImg}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : "notFoundImage"
                }
                alt={name}
              />
              <div className={css.castInfo}>
                <p className={css.castText}>{name}</p>
                <p className={css.castText}>Character: {character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
