import React from "react";
import { Link } from "react-router-dom";
import css from "./GoBackLink.module.css";
const GoBackLink = ({ to, child }) => {
  <Link className={css.GoBackButton} to={to}>
    {child}
  </Link>;
};

export default GoBackLink;
