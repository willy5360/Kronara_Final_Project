import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/button-humedity.scss";

const ButtonHumedity = () => {
    const [humidity, setHumidity] = useState("");

    const number = [89, 90, 91];

    useEffect(() => {
        setInterval(() => {
            setHumidity(number[Math.floor(Math.random() * number.length)]);
        }, 2000);
    }, []);

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
