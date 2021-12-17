import React, { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar.js";

import "../../styles/form-login.scss";

const FormLogin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { store, actions } = useContext(Context);

  const onSubmit = (data) => actions.login(data);

  return (
    <Fragment>
      {/* <Navbar /> */}

      <div className="container_main_form_login">
        <form onSubmit={handleSubmit(onSubmit)} className="form_login">
          <input
            type="email"
            placeholder="e-mail"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && "Email is required"}

          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && "Password is required"}

          <button type="submit">Sign In</button>
          <div className="already_account_container">
            <p>Forgot your password?</p>
            <a href="">Click Here</a>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default FormLogin;
