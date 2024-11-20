import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const MovieDetailsPage = () => {
  return (
    <div>
      <h2>Additional information</h2>
      <nav>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviewes</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
