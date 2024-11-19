import React from "react";
import { Link, Outlet } from "react-router-dom";

const MovieDetailsPage = () => {
  return (
    <div>
      <h2>Additional information</h2>
      <Link to="cast">Cast</Link>
      <Link to="reviwes">Reviewes</Link>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
