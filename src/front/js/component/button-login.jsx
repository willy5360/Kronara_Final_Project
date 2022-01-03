import React, { useState } from "react";
import FormLogin from "../pages/form-login.jsx";
import { Link } from "react-router-dom";
import "../../styles/button-login.scss";

const ButtonLogin = () => {
  return (
    <Link to="/FormLogin" className="navbar_login">
      <button className="navbar_login_button">Login</button>
    </Link>
  );
};

export default ButtonLogin;
