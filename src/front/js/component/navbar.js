import React from "react";
import ButtonSignUp from "../component/button-sign-up.jsx";
import ButtonLogin from "../component/button-login.jsx";
import "../../styles/navbar.scss";
import Robot from "../../img/—Pngtree—high-tech brain_5406718.png";

export const Navbar = () => {
    return (
        <nav className="NavBar">
            <div className="NavBar_name_kronara_movil">
                <img src={Robot} className="roboPhoto" />
                <h2>Welcome to Kronara!</h2>
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
