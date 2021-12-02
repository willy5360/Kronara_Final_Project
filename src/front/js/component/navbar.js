import React from "react";
import { Link } from "react-router-dom";
import ButtonSignUp from "../component/button-sign-up.jsx";

export const Navbar = () => {
	return (
		<div className="NavBar">
			<Link to="/ButtonSignUp"><ButtonSignUp /></Link>
		</div>
	);
};
