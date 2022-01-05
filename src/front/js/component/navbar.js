import React from "react";
import { Link } from "react-router-dom";
import ButtonSignUp from "../component/button-sign-up.jsx";
import ButtonLogin from "../component/button-login.jsx";
import "../../styles/navbar.scss";

export const Navbar = () => {
    return (
        <nav className="NavBar">
            <div className="NavBar_name_kronara_movil">
                <h2>Welcome to Kronara!</h2>
            </div>
            <div className="NavBar_name_kronara">
                <h2>Kronara</h2>
            </div>
            <div className="navbar_button_login">
                <ButtonLogin />
            </div>
            <ButtonSignUp />
        </nav>
    );
};
