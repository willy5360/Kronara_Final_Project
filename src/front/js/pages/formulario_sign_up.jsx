import React from "react";
import  { useContext } from "react";
import { useForm } from "react-hook-form";
import "../../styles/form_sign_up_new_user.scss";
import { Context } from "../store/appContext"

function FormSignUp() {
	const { store , actions} = useContext(Context);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const onSubmit = data => {
		actions.register(data);
	
		console.log(data)
	};

	// const setSuccessRegister = required => {
	// 	if (required == true) {
	// 		console.log("Register completed");
	// 	}
	// };

	return (
		<div className="container_main_form_sig_up">
			<form className="form__sign__up__new__user" onSubmit={handleSubmit(onSubmit)}>
				<header>
					<h2>Registro</h2>
					{errors.name &&
						errors.name.type &&
						errors.email &&
						errors.email.type &&
						errors.password &&
						errors.password.type === "required" && <span>Invalid e-mail or missing information</span>}
				</header>

				<div className="form__body__sign__up__new__user">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						{...register("name", { required: true, maxLength: 30, pattern: /^[a-zA-Z0-9_ ]*$/ })}
					/>

					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="email" {...register("email", { required: true })} />

					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						{...register("password", { required: true, minLength: 7 })}
					/>
					{errors.password && errors.password.type === "minLength" && <span>too short</span>}

					<label htmlFor="condition" className="form__body__sign__up_conditional">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry
					</label>
					<input
						type="radio"
						id="condition"
						className="form__body__sign__up_conditional_checkbox"
						{...register("condition", { required: true })}
					/>
				</div>

				<div className="form__footer__sign__up__new__user">
					<button className="form_sign_up_new_user_button" type="submit">
						Send
					</button>
					<span>
						Already an account?
						<a href="">Log in</a>
					</span>
				</div>
			</form>
		</div>
	);
}

export default FormSignUp;
