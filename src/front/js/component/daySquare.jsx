import React from "react";
import PropTypes from "prop-types";

const DaySquare = props => {
	const clicked = () => {
		window.alert("You've clicked me");
	};

	return (
		<div className={props.istoday.concat(props.isNumberOne)} onClick={clicked}>
			<span>{props.day}</span>
		</div>
	);
};

DaySquare.propTypes = {
	day: PropTypes.number,
	istoday: PropTypes.string,
	isNumberOne: PropTypes.string
};

export default DaySquare;
