import React, { useState } from "react";
import FormSignUp from "../pages/formulario_sign_up.jsx";
import { Link } from "react-router-dom";
import "../../styles/button-sign-up.scss";

const ButtonSignUp = () => {
  const [signUp, setSingUp] = useState("");

  return (
    <Link to="/FormSignUp" className="navbar_sign_up">
      <button className="navbar_sign_up_button">Sign Up</button>
    </Link>
  );
};

export default ButtonSignUp;
