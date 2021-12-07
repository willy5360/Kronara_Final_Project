import React from "react";
import { useForm } from "react-hook-form";
import "../../styles/form-login.scss";

const FormLogin = () => {
	const { register, handleSubmit } = useForm();
	const onSubmit = data => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="email" placeholder="e-mail" {...register("email", { required: true, maxLength: 20 })} />
			<input type="password" placeholder="password" {...register("password")} />
			<button type="submit">Sign In</button>
		</form>
	);
};

export default FormLogin;
