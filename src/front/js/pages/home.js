import React from "react";
import "../../styles/home.scss";
import { NavbarLanding } from "../component/navbarhome.jsx";
import { Navbar } from "../component/navbar.js";
import { Footer } from "../component/footer.js";

export const Home = () => {
    return (
        <div className="container-home">
            <div className="container-home-opacity">
                <NavbarLanding />
                <Navbar />
                <Footer />
            </div>
        </div>
    );
};
