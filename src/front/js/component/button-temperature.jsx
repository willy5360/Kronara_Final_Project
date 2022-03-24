import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "../../styles/button-temperature.scss";
import { Context } from "../store/appContext";

const ButtonTemperature = () => {
    const { store, actions } = useContext(Context);
    const [temperature, setTemperature] = useState("");
    const number = [21, 22, 23];

    useEffect(() => {
        setTimeout(() => {
            setTemperature(number[Math.floor(Math.random() * number.length)]);
        }, 2000);
    }, [store.currentHome]);

    return (
        <div className="container_button_temperature">
            <button className="button_temperature">
                <i className="fas fa-thermometer-half"></i>
                <h4>{temperature}º</h4>
            </button>
        </div>
    );
};

export default ButtonTemperature;
