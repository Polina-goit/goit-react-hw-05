import React from "react";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={css.container}>
      <nav className={css.headerNav}>
        <NavLink className={css.headerNavLink} to="/">
          Home
        </NavLink>
        <NavLink className={css.headerNavLink} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
