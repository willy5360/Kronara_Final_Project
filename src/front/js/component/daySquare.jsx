import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DaySquare = props => {
	const clicked = () => {
		
		window.alert("You've clicked me");
	};

	return (
		<div className={props.istoday.concat(props.isNumberOne)} onClick={""}>
			<Link  to={'/event'}>  <span>{props.day}</span></Link>
		</div>
	);
};

DaySquare.propTypes = {
	day: PropTypes.number,
	istoday: PropTypes.string,
	isNumberOne: PropTypes.string
};

export default DaySquare;
