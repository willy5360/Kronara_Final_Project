import React from "react";
import "../../styles/home.scss";
<<<<<<< HEAD

import MonthSquare from "../component/monthSquare.jsx";
export const Home = () => {
  return (
    <Fragment>
      <MonthSquare />
    </Fragment>
=======
import { Navbar } from "../component/navbar.js";

export const Home = () => {
  return (
    <div className="container-home">
      <div className="container-home-opacity">
        <Navbar />
      </div>
    </div>
>>>>>>> 83da702267e2e973acd04c6ad3427526be29836b
  );
};
