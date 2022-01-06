import React from "react";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar.js";
import { Footer } from "../component/footer.js";

export const Home = () => {
    return (
        <div className="container-home">
            <div className="container-home-opacity">
                <Navbar />
                <Footer />
            </div>
        </div>
    );
};
