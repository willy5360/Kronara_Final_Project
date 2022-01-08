import React from "react";
import ButtonSignUp from "../component/button-sign-up.jsx";
import ButtonLogin from "../component/button-login.jsx";
import "../../styles/navbar-landing.scss";

export const NavbarLanding = () => {
    return (
        <nav className="NavBarLanding">
            <div className="NavBar_name_kronara-Landing">
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
