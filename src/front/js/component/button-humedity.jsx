import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/button-humedity.scss";
import { Context } from "../store/appContext";

const ButtonHumedity = () => {
    const { store, actions } = useContext(Context);

    const [humidity, setHumidity] = useState("");

    const number = [89, 90, 91];

    useEffect(() => {
        setTimeout(() => {
            setHumidity(number[Math.floor(Math.random() * number.length)]);
        }, 2000);
    }, [store.currentHome]);

    return (
        <div className="container_button_humedity">
            <button className="button_humedity">
                <i className="fas fa-tint"></i>
                <h4>{humidity}%</h4>
            </button>
        </div>
    );
};

export default ButtonHumedity;
