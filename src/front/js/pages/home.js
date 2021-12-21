import React from "react";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar.js";
import HabitsWidget from "../component/habitsWidget.jsx";

export const Home = () => {
  return (
    <div className="container-home">
      <div className="container-home-opacity">
        <Navbar />
        <HabitsWidget />
      </div>
    </div>
  );
};
