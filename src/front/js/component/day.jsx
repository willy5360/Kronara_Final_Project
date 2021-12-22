import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../styles/day.scss";

import { Context } from "../store/appContext";
import Event from "./event.jsx";
import PropTypes from "prop-types";

const Day = (props) => {
    const { actions, store } = useContext(Context);
    const [memberEvent, setMemberEvent] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log("store apointmet", store.currentAppointments);
        setMemberEvent(
            store.currentAppointments.map((event, index) => {
                // console.log("aqui esta event", event);
                if (
                    props.date.toDateString() ==
                    new Date(event.date).toDateString()
                ) {
                    return (
                        <div key={index.toString()}>
                            <div className="day_appointment__title">
                                Appointment: {event.appointment}
                            </div>
                            <div>Time start:{event.time_start}</div>
                            <div>Time ends:{event.time_ends}</div>
                            <div>Location: {event.location}</div>
                            <div>Notes: {event.notes}</div>
                        </div>
                    );
                } else {
                    return null;
                }
            })
        );
    }, [props.date.toDateString(), store.currentAppointments]);

    return (
        <div className="main__container__day__visible">
            <div className="main__day__form">
                <div className="day__appointment">
                    <label htmlFor="">Today</label>
                    <div>{props.date.toDateString()}</div>
                </div>
                <div className="day__appointment__all">
                    <div className="day__appointment__event">{memberEvent}</div>
                </div>
                {show ? (
                    <Event
                        isClicked={() => setShow(false)}
                        eventDate={props.date.toDateString()}
                    />
                ) : (
                    ""
                )}

                <div className="day__buttons">
                    <button
                        onClick={() => {
                            props.clicked();
                        }}
                        className="day__back__button"
                    >
                        Back
                    </button>
                    <button className="day--link" onClick={() => setShow(true)}>
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
};

Day.propTypes = {
    date: PropTypes.string,
    clicked: PropTypes.func,
};
export default Day;
