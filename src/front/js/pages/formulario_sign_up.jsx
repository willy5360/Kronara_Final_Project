import React from "react";
import { useForm } from "react-hook-form";

const FormSignUp = () => {
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = data => {
		console.log(data);
	};

	return (
		<form className="form__sign__up__new__user" onSubmit={handleSubmit(onSubmit)}>
			<header>
				<h2>Registro</h2>
			</header>
			<div className="form__body__sign__up__new__user">
				<label htmlFor="" className="form-label">
					Name
				</label>
				<input type="text" id="username" required ref={{ register: "Name Required" }} />
				<label htmlFor="" className="form-label">
					Email
				</label>
				<input type="email" id="emailuser" ref={{ register: "Email Required" }} />
				<label htmlFor="" className="form-label">
					Password
				</label>
				<input
					type="password"
					id="passworduser"
					name="password"
					required
					ref={{ register: "Password Required", value: 8, message: "Too short" }}>
					{/* {errors.password && <p>{errors.password.message}</p>} */}
				</input>
				<label htmlFor="" className="form-label form__body__sign__up_conditional">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry
				</label>
				<input
					type="radio"
					id="conditionsuser"
					className="form__body__sign__up_conditional_checkbox"
					required
					ref={register}
				/>
			</div>
			<div className="form__footer__sign__up__new__user">
				<button className="form_sign_up_new_user_button" type="submit">
					Send
				</button>
				<span>
					Already an account? <a href="">Log in</a>
				</span>
			</div>
		</form>
	);
};

export default FormSignUp;
