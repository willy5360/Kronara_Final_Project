import React from "react";
import PropTypes from "prop-types";
import HolidayCircle from "./holidayCircle.jsx";

const DaySquare = (props) => {
    const clicked = () => {
        window.alert("You've clicked me");
    };
    if (props.holidayName) {
        return (
            <div className={props.istoday.concat(props.isNumberOne)}>
                <HolidayCircle />
                <span className="day_square--holidayName">
                    <div>{props.holidayName}</div>
                </span>
                <span className="day_square--dayNumber">{props.day}</span>
            </div>
        );
    } else {
        return (
            <div className={props.istoday.concat(props.isNumberOne)}>
                <span className="day_square--holidayName">
                    <div>{props.holidayName}</div>
                </span>
                <span className="day_square--dayNumber">{props.day}</span>
            </div>
        );
    }
};

DaySquare.propTypes = {
    day: PropTypes.number,
    istoday: PropTypes.string,
    isNumberOne: PropTypes.string,
    holidayName: PropTypes.string,
};

export default DaySquare;
