
import React, { useState } from "react";
import "../../styles/event.scss";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

const Event = () => {
	const { register, handleSubmit } = useForm();
	const onSubmit = data => console.log(data);
	 
	return (
	<div className="main__container__appoitment">
	  <form onSubmit={handleSubmit(onSubmit)} className="main__appoitment__form">
		  <div className= "event__inputs">
		 	<h2>Create a event</h2>
			<div className="appoitment__input">
				<i className="fas fa-calendar-check" />
				<label>Appoitment:</label>
				<input {...register("Appoitment")} />
			</div>

			<div className="appoitmen__friend">
				<i className="fas fa-users" />
				<label>Invite a friend</label>
				<select {...register("friend")}>
				<option value="">Add a friend</option>
				<option value="Willy">Willy</option>
				<option value="Ana">Ana</option>
				<option value="other">other</option>
				</select>
			</div>

			<div className="appoitment__all__day">
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

			<div className="appoitment__start">
				<span>Start</span>
				<input type="time" id="appt" name="appt"></input>
			</div>

			<div className="appoitment__end">
				<span>End</span>
				<input type="time" id="appt" name="appt"></input>
			</div>



		<div className="appoitment__mail">
			<i className="far fa-calendar-alt" />
			<label>Email</label>
			<input {...register("Email")} />
		</div>

		<div className="appoitment__alert">
			<i className="far fa-bell" />
			<label>Alert</label>
			<select {...register("alert")}>
				<option value="At time">At time of event</option>
				<option value="5 mins">5 mins before</option>
				<option value="10 mins">10 mins before</option>
				<option value="1 hour">1 hour before</option>
				{/* <option value="other">Other</option> */}
			</select>
			
		</div>

		<div className="appoitment__location">
			<i className="fas fa-map-marker-alt" />
			<label>Location</label>
			<input {...register("Location")} />
		</div>

		<div className="appoitment__notes">
			<i className="far fa-sticky-note" />
			<label>Notes</label>
			<input {...register("notes")} />
		</div>

		</div>

		<div className= "appoitment__buttons">
		<button type="reset" className="form__cancel" ><Link  to={'/'}>  <span>canel</span></Link></button>
		<button type="submit" className="form__submit">Send</button>
		</div>
	  </form>
	 
	  </div>
	);
}

export default Event;