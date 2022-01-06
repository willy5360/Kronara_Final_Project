import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/button-humedity.scss";

const ButtonHumedity = () => {
    return (
        <div className="container_button_humedity">
            <button className="button_humedity">
                <i className="fas fa-tint"></i> 43%
            </button>
        </div>
    );
};

export default ButtonHumedity;
