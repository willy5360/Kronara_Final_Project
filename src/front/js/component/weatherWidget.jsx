import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/weatherWidget.scss";
import SUN from "../../img/sun.gif";
import COLD from "../../img/cold.gif";

const WeatherWidget = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getWeather();
    }, []);

    return (
        <div className="weather__container">
            <img src={store.weather.temp < 16 ? COLD : SUN} />
            <ul>
                <li>Temperature: {store.weather.temp} °C</li>
                <li>Min: {store.weather.temp_min} °C</li>
                <li>Max: {store.weather.temp_max} °C</li>
                <li>Humidity: {store.weather.humidity} %</li>
            </ul>
        </div>
    );
};

export default WeatherWidget;
