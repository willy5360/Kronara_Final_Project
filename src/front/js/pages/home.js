import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="alert alert-info">{store.message || "Loading message from the backend..."}</div>
			<p>This boilerplate comes with lots of documentation: </p>
		</div>
	);
};
