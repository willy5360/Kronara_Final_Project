import React, { Fragment, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/day.scss";

const AppointmentCard = (props) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="day__appointment__main">
            <div className="day_appointment__title">{props.appointment}</div>
            <div className="day__appointment__content">
                <div className="day__appointment__info">
                    <div>Time start: {props.time_start}</div>
                    <div>Time ends: {props.time_ends}</div>
                    <div>Location: {props.location}</div>
                    <div>Notes: {props.notes}</div>
                </div>
                <button
                    className="day__appointment__button"
                    type="button"
                    onClick={() => {
                        actions.deleteEvent(props.id);
                    }}
                >
                    <span>
                        <i className="far fa-trash-alt"></i>
                    </span>
                </button>
            </div>
        </div>
    );
};

AppointmentCard.propTypes = {
    appointment: PropTypes.string,
    time_start: PropTypes.string,
    time_ends: PropTypes.string,
    location: PropTypes.string,
    notes: PropTypes.string,
    id: PropTypes.number,
};

export default AppointmentCard;
