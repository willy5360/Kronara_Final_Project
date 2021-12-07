import React from "react";
import { Link } from "react-router-dom";
import ButtonSignUp from "../component/button-sign-up.jsx";
import ButtonLogin from "../component/button-login.jsx";

export const Navbar = () => {
	return (
		<div className="NavBar">
			<Link to="/ButtonLogin" className="navbar_button_login">
				<ButtonLogin />
			</Link>
			<Link to="/ButtonSignUp">
				<ButtonSignUp />
			</Link>
		</div>
	);
};
