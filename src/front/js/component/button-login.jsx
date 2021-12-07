import React, { useState } from "react";
import FormLogin from "../pages/form-login.jsx";
import { Link } from "react-router-dom";
import "../../styles/button-login.scss";

const ButtonLogin = () => {
	return (
		<div className="navbar_login">
			<Link to="/FormLogin">
				<button className="navbar_login_button">Login</button>
			</Link>
		</div>
	);
};

export default ButtonLogin;
