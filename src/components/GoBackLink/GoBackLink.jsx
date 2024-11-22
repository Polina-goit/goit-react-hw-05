import React from "react";
import { Link } from "react-router-dom";

const GoBackLink = ({ to, child }) => {
  <Link to={to}>{child}</Link>;
};

export default GoBackLink;
