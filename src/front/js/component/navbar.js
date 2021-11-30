import React from "react";
import { Link } from "react-router-dom";
import ButtonSignUp from "../component/button-sign-up.jsx";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/">
						<ButtonSignUp />
					</Link>
				</div>
			</div>
		</nav>
	);
};
