import React from "react";
import { Link } from "react-router-dom";
import ButtonSignUp from "../component/button-sign-up.jsx";
import ButtonLogin from "../component/button-login.jsx";
import "../../styles/navbar.scss";

export const Navbar = () => {
  return (
    <div className="NavBar">
      <div className="NavBar_name_kronara">
        <h2>Kronara</h2>
      </div>
      <Link to="/ButtonLogin" className="navbar_button_login">
        <ButtonLogin />
      </Link>
      <Link to="/ButtonSignUp">
        <ButtonSignUp />
      </Link>
    </div>
  );
};
