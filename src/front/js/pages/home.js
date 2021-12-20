import React from "react";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar.js";
// import MonthSquare from "../component/monthSquare.jsx";

export const Home = () => {
    return (
        <div className="container-home">
            <div className="container-home-opacity">
                <Navbar />
                {/* <MonthSquare /> */}
            </div>
        </div>
    );
};
