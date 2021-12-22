import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/modal.scss";
import HolidayCircle from "./holidayCircle.jsx";
import Day from "./day.jsx";

const DaySquare = (props) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <div
                className={props.istoday.concat(props.isNumberOne)}
                onClick={() => {
                    setShow(true);
                }}
            >
                {props.holidayName ? <HolidayCircle /> : ""}
                <span className="day_square--holidayName">
                    <div>{props.holidayName}</div>
                </span>
                <span className="day_square--dayNumber">{props.day}</span>
            </div>
            {show ? (
                <Day
                    clicked={() => setShow(false)}
                    date={new Date(props.year, props.month, props.day)}
                />
            ) : null}
        </>
    );
};

DaySquare.propTypes = {
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
    istoday: PropTypes.string,
    isNumberOne: PropTypes.string,
    holidayName: PropTypes.string,
};

export default DaySquare;
