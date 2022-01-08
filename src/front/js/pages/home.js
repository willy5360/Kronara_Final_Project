import React from "react";
import "../../styles/home.scss";
import { NavbarLanding } from "../component/navbarhome.jsx";
import { Navbar } from "../component/navbar.js";
import { Footer } from "../component/footer.js";
import { LandingPage } from "./landingPage.jsx";

export const Home = () => {
    return (
        <div className="container-home">
            <div className="container-home-opacity">
                <NavbarLanding />
                <Navbar />
                <LandingPage />
                <Footer />
            </div>
        </div>
    );
};
