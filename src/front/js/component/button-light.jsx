import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "../../styles/button-light.scss";
import Toggle from "../component/toggle-button-domotic.jsx";

const ButtonLight = () => {
    return (
        <div className="container_buttons_domotic">
            <div className="container_domotic">
                <div className="button_light">
                    <div className="button_light_text">
                        <h5>Light</h5>
                        <h6>Kitchen</h6>
                    </div>
                    <Toggle />
                </div>
            </div>
            <div className="container_domotic">
                <div className="button_light">
                    <div className="button_light_text">
                        <h5>Heating</h5>
                    </div>
                    <Toggle />
                </div>
            </div>
            <div className="container_domotic">
                <div className="button_light">
                    <div className="button_light_text">
                        <h5>Light</h5>
                        <h6>Office</h6>
                    </div>
                    <Toggle />
                </div>
            </div>
            <div className="container_domotic">
                <div className="button_light">
                    <div className="button_light_text">
                        <h5>Light</h5>
                        <h6>Room</h6>
                    </div>
                    <Toggle />
                </div>
            </div>
        </div>
    );
};

export default ButtonLight;
