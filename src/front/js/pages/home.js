import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import ButtonSignUp from "../component/button-sign-up.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return <ButtonSignUp />;
};
