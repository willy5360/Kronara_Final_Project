import React, { useContext, useState } from "react";
import "../../styles/event.scss";
// import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Event = () => {
  const { register, handleSubmit } = useForm();
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const handleClick = () => setChecked(!checked);
  const handleClick1 = () => setChecked1(!checked1);
  const { store, actions } = useContext(Context);

  const onSubmit = (event) => {
    console.log("aqui esta el even en front", event);
    actions.newEvent(event);
  };

  return (
    <div className="main__container__appointment">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="main__appointment__form"
      >
        <div className="event__inputs">
          <h2>Create a event</h2>
          <div className="appointment__input">
            <i className="fas appointment__icons fa-calendar-check" />
            <label htmlFor="appointment">Appointment:</label>
            <input
              id="appointment"
              {...register("appointment", { required: true })}
            />
          </div>

          <div className="appointment__friend">
            <i className="fas appointment__icons fa-users" />
            <label htmlFor="friend">Invite a friend</label>
          </div>
          <div className="appointment__friend__checkbox">
            <label htmlFor="ana">ana</label>
            <input
              onClick={handleClick}
              checked={checked}
              type="checkbox"
              id="Ana"
              name="Ana"
              {...register("Ana")}
            />
          </div>

          <div className="appointment__all__day">
            <i className="far appointment__icons fa-clock" />
            <span>All day</span>
            <input type="checkbox" hidden="hidden" id="username" />
            <label class="switch" for="username"></label>
          </div>

          <div className="appointment__start">
            <label htmlFor="time_start">start</label>
            <input
              id="time_start"
              {...register("time_start", { required: false })}
            />
          </div>
          <div className="appointment__end">
            <label htmlFor="time_ends">end</label>
            <input
              id="time_ends"
              {...register("time_ends", { required: false })}
            />
          </div>

          <div className="appointment__mail">
            <i className="far appointment__icons fa-calendar-alt" />
            <label htmlFor="email">Email</label>
            <input id="email" {...register("email", { required: false })} />
          </div>

          <div className="appointment__alert">
            <i className="far appointment__icons fa-bell" />
            <label htmlFor="alert">Alert</label>
            <select
              id="alert"
              // {...register("alert")}
              className="select-dropdown"
            >
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
              {...register("location", { required: false })}
            />
          </div>

          <div className="appointment__notes">
            <i className="far appointment__icons fa-sticky-note" />
            <label htmlFor="notes">Notes</label>
            <input id="notes" {...register("notes", { required: false })} />
          </div>
        </div>

        <div className="appointment__buttons">
          <Link to={"/"}>
            <button type="reset" className="form__cancel">
              {" "}
              CANCEL
            </button>
          </Link>
          <button type="submit" className="form__submit">
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default Event;
