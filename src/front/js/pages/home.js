import React, { Fragment, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar.js";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return <Navbar />;
};
