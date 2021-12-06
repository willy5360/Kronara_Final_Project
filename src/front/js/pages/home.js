import React, { Fragment, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import MonthSquare from "../component/monthSquare.jsx";
import Event from "../component/event.jsx";

export const Home = () => {
	return (
		<Fragment>
			<MonthSquare />
		
		</Fragment>
	);
};
