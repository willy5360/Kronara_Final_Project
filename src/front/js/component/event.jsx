
import React, { useState } from "react";
import "../../styles/event.scss";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

const Event = () => {
	const { register, handleSubmit } = useForm();
	const onSubmit = data => console.log(data);
	 
	return (
	<div className="main__container__appointment">
	  <form onSubmit={handleSubmit(onSubmit)} className="main__appointment__form">
		  <div className= "event__inputs">
		 	<h2>Create a event</h2>
			<div className="appointment__input">
				<i className="fas fa-calendar-check" />
				<label htmlFor="appointment">Appointment:</label>
				<input id="appointment" {...register("appointment")} />
			</div>

			<div className="appointment__friend">
				<i className="fas fa-users" />
				<label htmlFor="friend">Invite a friend</label>
				<select id="friend" {...register("friend")}>
				<option value="">Add a friend</option>
				<option value="Willy">Willy</option>
				<option value="Ana">Ana</option>
				<option value="other">other</option>
				</select>
			</div>

			<div className="appointment__all__day">
			<i className="far fa-clock" />
					<span>All day</span>
				<div className="switch-holder">
				<div className="switch-label">
            	</div>
          		<div className="switch-toggle">
                <input type="checkbox" id="all_day"/>
                <label for="all_day"></label>
            </div>
			</div>
			</div>

			<div className="appointment__start">
				<span>Start</span>
				<input type="time" id="appt" name="appt"></input>
			</div>

			<div className="appointment__end">
				<span>End</span>
				<input type="time" id="appt" name="appt"></input>
			</div>



		<div className="appointment__mail">
			<i className="far fa-calendar-alt" />
			<label htmlFor="email">Email</label>
			<input id="email" {...register("email")} />
		</div>

		<div className="appointment__alert">
			<i className="far fa-bell" />
			<label htmlFor="alert">Alert</label>
			<select id="alert" {...register("alert")}>
				<option value="At time">At time of event</option>
				<option value="5 mins">5 mins before</option>
				<option value="10 mins">10 mins before</option>
				<option value="1 hour">1 hour before</option>
				{/* <option value="other">Other</option> */}
			</select>
			
		</div>

		<div className="appointment__location">
			<i className="fas fa-map-marker-alt" />
			<label htmlFor="location">Location</label>
			<input id="location" {...register("location")} />
		</div>

		<div className="appointment__notes">
			<i className="far fa-sticky-note" />
			<label htmlFor="notes">Notes</label>
			<input id="notes" {...register("notes")} />
		</div>

		</div>

		<div className= "appointment__buttons">
		<Link  to={'/'} ><button type="reset" className="form__cancel"  >  CANCEL</button></Link>
		<button type="submit" className="form__submit">SEND</button>
		</div>
	  </form>
	 
	  </div>
	);
}

export default Event;