import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../styles/day.scss";

import { Context } from "../store/appContext";
import Event from "./event.jsx";
import PropTypes from "prop-types";
import AppointmentCard from "./appointmentCard.jsx";
import HolidayCard from "./holidayCard.jsx";

const Day = (props) => {
    const { store, actions } = useContext(Context);
    const [memberEvent, setMemberEvent] = useState([]);
    const [holiday, setHoliday] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setMemberEvent(
            store.currentAppointments.map((event, index) => {
                // console.log("aqui esta event", event);
                if (
                    props.date.toDateString() ==
                    new Date(event.date).toDateString()
                ) {
                    return (
                        <AppointmentCard
                            key={index.toString()}
                            appointment={event.appointment.toUpperCase()}
                            time_start={event.time_start}
                            time_ends={event.time_ends}
                            location={event.location}
                            notes={event.notes}
                            id={event.id}
                        />
                    );
                }
            })
        );

        setHoliday(
            store.holiday.map((holiday, index) => {
                if (
                    new Date(holiday.date).getDate() == props.date.getDate() &&
                    new Date(holiday.date).getMonth() == props.date.getMonth()
                ) {
                    return (
                        <HolidayCard
                            key={index.toString()}
                            name={holiday.name}
                        />
                    );
                }
            })
        );
    }, [props.date.toDateString(), store.currentAppointments, store.holiday]);

    return (
        <div className="main__container__day__visible">
            <div className="main__day__form">
                <div className="day__appointment">
                    <label htmlFor="">Today</label>
                    <div>{props.date.toDateString()}</div>
                </div>
                <div className="day__holiday">{holiday}</div>
                <div className="day__appointment__event">{memberEvent}</div>
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
                        BACK
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
