import React from "react";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar.js";
import { Footer } from "../component/footer.js";
import MonthSquare from "../component/monthSquare.jsx";
import { LandingPage } from "./landingPage.jsx";

export const Home = () => {
    return (
        <div className="container-home">
            <div className="container-home-opacity">
                <Navbar />
                <LandingPage />
                <Footer />
            </div>
        </div>
    );
};
