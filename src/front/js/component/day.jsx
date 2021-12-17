import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../styles/day.scss";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

const Day = (props) => {
    const { actions, store } = useContext(Context);
    const [allEvents, setAllEvents] = useState();

    return (
        <div className="main__container__day">
            <div className="main__day__form">
                <div className="day__appointment">
                    <label htmlFor="">appointments</label>
                    <p>{new Date(props.year, props.month, props.day)}</p>
                </div>

                <Link className="day_square--link" to={"/event"}>
                    create event
                </Link>
            </div>
        </div>
    );
};

Day.propTypes = {
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
};
export default Day;
