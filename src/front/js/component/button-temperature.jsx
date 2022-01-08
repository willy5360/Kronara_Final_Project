import React, { useState } from "react";
import "../../styles/button-temperature.scss";

const ButtonTemperature = () => {
    return (
        <div className="container_button_temperature">
            <button className="button_temperature">
                <i class="fas fa-thermometer-half"></i>15º
            </button>
        </div>
    );
};

export default ButtonTemperature;
