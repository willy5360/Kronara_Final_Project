import React, { Fragment, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar.js";
import { Container } from "react-bootstrap";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
	<div className="container-home">
		<div className="container-home-opacity">
			<Navbar />
		</div>
	</div>
	)
};
