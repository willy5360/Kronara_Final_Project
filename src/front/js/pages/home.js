import React, { Fragment, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import MonthSquare from "../component/monthSquare.jsx";
import WeatherWidget from "../component/weatherWidget.jsx";

export const Home = () => {
	return (
		<Fragment>
			<MonthSquare />
			<WeatherWidget />
		</Fragment>
	);
};
