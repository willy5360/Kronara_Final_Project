import React, { Fragment, useContext } from "react";
import "../../styles/home.scss";
import MonthSquare from "../component/monthSquare.jsx";
import Holiday from "../component/holyday.jsx";

export const Home = () => {
	return (
		<Fragment>
			<MonthSquare />
			<Holiday />
		</Fragment>
	);
};
