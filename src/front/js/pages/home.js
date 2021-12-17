import React from "react";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar.js";

export const Home = () => {
  return (
    <div className="container-home">
      <div className="container-home-opacity">
        <Navbar />
      </div>
    </div>
  );
};
