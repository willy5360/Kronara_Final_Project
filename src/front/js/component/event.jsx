import React, { Fragment, useContext, useEffect, useState } from "react";
import "../../styles/event.scss";
// import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "regenerator-runtime/runtime";

const Event = (props) => {
    const { register, handleSubmit } = useForm();
    const { store, actions } = useContext(Context);
    const [members, setMembers] = useState([]);
    const [allDay, setAllday] = useState(false);

    const onSubmit = async (data) => {
        let response = await actions.newEvent(data);
        if (response) {
            props.isClicked();
        }
    };

    useEffect(() => {
        setMembers(
            store.member.map((mappedMember) => {
                if (mappedMember.id != store.currentMember.id) {
                    return (
                        <div
                            className="appointment__friend__checkBox--container"
                            key={mappedMember.id.toString()}
                        >
                            <label htmlFor={mappedMember.username}>
                                {mappedMember.username}
                            </label>
                            <input
                                type="checkbox"
                                id={mappedMember.username}
                                name={mappedMember.username}
                                value={mappedMember.id}
                                {...register("friend")}
                            />
                        </div>
                    );
                }
            })
        );
    }, [store.member]);

    return (
        <div className="main__container__appointment__visible">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="main__appointment__form"
            >
                <div className="event__inputs">
                    <div className="appointment__date__title">
                        {props.eventDate}
                    </div>
                    <div className="appointment__title">Create a event</div>

                    <div className="appointment__date">
                        <label htmlFor="date"></label>
                        <input
                            id="date"
                            type="text"
                            defaultValue={`${new Date(
                                props.eventDate
                            ).getFullYear()}-${new Date(
                                props.eventDate
                            ).getMonth() + 1}-${new Date(
                                props.eventDate
                            ).getDate()}`}
                            {...register("date", { required: true })}
                        />
                    </div>

                    <div className="appointment__input">
                        <i className="fas appointment__icons fa-calendar-check" />
                        <label htmlFor="appointment">Appointment:</label>
                        <input
                            id="appointment"
                            type="text"
                            {...register("appointment", { required: true })}
                        />
                    </div>

                    <div className="appointment__friend">
                        <i className="fas appointment__icons fa-users" />
                        <label htmlFor="friend">Invite a friend</label>
                    </div>
                    <div className="appointment__friend__checkbox">
                        {members}
                    </div>

                    <div className="appointment__all__day">
                        <i className="far appointment__icons fa-clock" />
                        <span>All day</span>
                        <input
                            type="checkbox"
                            hidden="hidden"
                            id="all_day"
                            onClick={() => {
                                setAllday(!allDay);
                            }}
                            {...register("all_day", { required: false })}
                        />
                        <label
                            className="appointment__all__day__switch"
                            htmlFor="all_day"
                        ></label>
                    </div>

                    {!allDay ? (
                        <>
                            <div className="appointment__start">
                                <label htmlFor="time_start">start</label>
                                <input
                                    id="time_start"
                                    type="time"
                                    defaultValue={"00:00"}
                                    {...register("time_start", {
                                        required: false,
                                    })}
                                />
                            </div>
                            <div className="appointment__end">
                                <label htmlFor="time_ends">end</label>
                                <input
                                    type="time"
                                    id="time_ends"
                                    name="time_ends"
                                    defaultValue={"23:59"}
                                    {...register("time_ends", {
                                        required: false,
                                    })}
                                />
                            </div>
                        </>
                    ) : null}

                    <div className="appointment__alert">
                        <i className="far appointment__icons fa-bell" />
                        <label htmlFor="alert">Alert</label>
                        <select id="alert" className="select-dropdown">
                            <option value="At time">At time of event</option>
                            <option value="5 mins">5 mins before</option>
                            <option value="10 mins">10 mins before</option>
                            <option value="1 hour">1 hour before</option>
                            {/* <option value="other">Other</option> */}
                        </select>
                    </div>

                    <div className="appointment__location">
                        <i className="fas appointment__icons fa-map-marker-alt" />
                        <label htmlFor="location">Location</label>
                        <input
                            id="location"
                            type="text"
                            {...register("location", { required: false })}
                        />
                    </div>

                    <div className="appointment__notes">
                        <i className="far appointment__icons fa-sticky-note" />
                        <label htmlFor="notes">Notes</label>
                        <input
                            id="notes"
                            type="text"
                            {...register("notes", { required: false })}
                        />
                    </div>
                </div>

                <div className="appointment__buttons">
                    <button
                        onClick={() => props.isClicked()}
                        type="reset"
                        className="form__cancel"
                    >
                        CANCEL
                    </button>
                    <button type="submit" className="form__submit">
                        SEND
                    </button>
                </div>
            </form>
        </div>
    );
};

Event.propTypes = {
    eventDate: PropTypes.string,
    isClicked: PropTypes.func,
};

export default Event;
