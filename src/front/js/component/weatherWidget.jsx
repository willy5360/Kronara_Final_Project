import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/weatherWidget.scss";
import SUNNY from "../../img/sunny.gif";
import RAINNY from "../../img/rainny.gif";

const WeatherWidget = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getWeather();
    }, []);

    return (
        <div className="weather__container">
            <img src={store.weather.temp < 16 ? RAINNY : SUNNY} />
            <ul>
                <li>
                    <div className="weather__description">Temperature: </div>
                    {store.weather.temp} °C
                </li>
                <li>
                    <div className="weather__description">Min: </div>
                    {store.weather.temp_min} °C
                </li>
                <li>
                    <div className="weather__description">Max: </div>
                    {store.weather.temp_max} °C
                </li>
                <li>
                    <div className="weather__description">Humidity: </div>
                    {store.weather.humidity} %
                </li>
            </ul>
        </div>
    );
};

export default WeatherWidget;
