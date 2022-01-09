import React, { useState } from "react";
import { useEffect } from "react";
import "../../styles/button-temperature.scss";

const ButtonTemperature = () => {
    const [temperature, setTemperature] = useState("");

    const number = [21, 22, 23];

    useEffect(() => {
        setInterval(() => {
            setTemperature(number[Math.floor(Math.random() * number.length)]);
        }, 2000);
    }, []);

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
