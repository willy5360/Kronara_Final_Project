import React from "react";
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
            <div>
                <ButtonLogin />
            </div>
            <div>
                <ButtonSignUp />
            </div>
        </nav>
    );
};
