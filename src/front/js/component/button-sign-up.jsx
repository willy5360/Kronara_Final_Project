import React, { useState } from "react";
import FormSignUp from "../pages/formulario_sign_up.jsx";
import { Link } from "react-router-dom";

const ButtonSignUp = () => {
	const [signUp, setSingUp] = useState("");

	return (
		<div className="navbar_sign_up">
			<Link to="/FormSignUp">
				<button className="navbar_sign_up_button">Sign Up</button>
			</Link>
		</div>
	);
};

export default ButtonSignUp;
