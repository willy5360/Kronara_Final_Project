import React, { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import { useContext } from "react";

import { NavbarLanding } from "../component/navbarhome.jsx";
import { Footer } from "../component/footer.js";
import { useForm } from "react-hook-form";
import "../../styles/form_sign_up_new_user.scss";
import { Context } from "../store/appContext";

function FormSignUp() {
    const { store, actions } = useContext(Context);
    const [newHome, setNewHome] = useState();
    const [inputHome, setInputHome] = useState(null);
    const cloudUrl =
        "https://api.cloudinary.com/v1_1/willykronara/image/upload";

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("file", data.photo_user[0]);
        formData.append("upload_preset", "kronara");

        Axios.post(cloudUrl, formData)
            .then((res) => res.data.secure_url)
            .then((newUrl) => {
                data.photo_user = newUrl;
                actions.register(data);
            });
    };

    useEffect(() => {
        if (newHome === true) {
            setInputHome(
                <Fragment>
                    <input
                        placeholder="New Home"
                        type="text"
                        id="home"
                        {...register("home", { required: true })}
                    />

                    <label htmlFor="city">Select Your city</label>
                    <select
                        {...register("city")}
                        className="form__body__sign__up__city"
                    >
                        <option value="madrid" name="city">
                            Madrid
                        </option>
                        <option value="barcelona" name="city">
                            Barcelona
                        </option>
                        <option value="paris" name="city">
                            Paris
                        </option>
                    </select>
                </Fragment>
            );
        } else if (newHome === false) {
            setInputHome(
                <Fragment>
                    <input
                        id="home"
                        placeholder="Existing home"
                        type="text"
                        {...register("home", { required: true })}
                    />
                </Fragment>
            );
        }
    }, [newHome]);

    return (
        <Fragment>
            <NavbarLanding />
            <div className="container_main_form_sig_up">
                <form
                    className="form__sign__up__new__user"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Fragment>
                        <header>
                            <h2>Register</h2>
                            {errors.name &&
                                errors.name.type &&
                                errors.email &&
                                errors.email.type &&
                                errors.password &&
                                errors.password.type === "required" && (
                                    <span>
                                        Invalid e-mail or missing information
                                    </span>
                                )}
                        </header>

                        <div className="form__body__sign__up__new__user">
                            <label htmlFor="username">Name</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                {...register("username", {
                                    required: true,
                                    maxLength: 30,
                                    pattern: /^[a-zA-Z0-9_ ]*$/,
                                })}
                            />

                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                {...register("email", {
                                    required: true,
                                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                })}
                            />

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 7,
                                })}
                            />
                            {errors.password &&
                                errors.password.type === "minLength" && (
                                    <span>too short</span>
                                )}

                            <label htmlFor="photo_user">Photo user</label>
                            <input
                                className="input_photo_user"
                                type="file"
                                name="photo_user"
                                id="photo_user"
                                {...register("photo_user", {
                                    required: true,
                                    minLength: 7,
                                })}
                            />
                            <div className="form_sig_up_type_of_home">
                                <label>New home</label>
                                <input
                                    type="radio"
                                    id="new_home"
                                    name="home_status"
                                    value="new_home"
                                    onClick={() => {
                                        setNewHome(true);
                                    }}
                                    {...register("home_status")}
                                />

                                <label>Existing home</label>
                                <input
                                    type="radio"
                                    value="existing_home"
                                    id="existing_home"
                                    name="home_status"
                                    onClick={() => {
                                        setNewHome(false);
                                    }}
                                    {...register("home_status")}
                                />
                            </div>
                            {inputHome}
                            <div className="form_sig_up_conditional">
                                <input
                                    type="checkbox"
                                    id="condition"
                                    className="form__body__sign__up_conditional_checkbox"
                                    {...register("condition", {
                                        required: true,
                                    })}
                                />
                                <label
                                    htmlFor="condition"
                                    className="form__body__sign__up_conditional"
                                >
                                    Acepto las condiciones de Kronara C.A.
                                </label>
                            </div>
                        </div>
                    </Fragment>
                    <div className="form__footer__sign__up__new__user">
                        <input
                            value="Send"
                            className="form_sign_up_new_user_button"
                            type="submit"
                        />
                        <div className="already_account_container">
                            <p>Already an account?</p>
                            <a href="">Log in</a>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </Fragment>
    );
}

export default FormSignUp;
