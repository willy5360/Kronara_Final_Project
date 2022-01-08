import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/widget-calendar.scss";
import MonthSquare from "../pages/monthSquare.jsx";
import JANUARY from "../../img/january.png";

const WidgetCalendar = () => {
    return (
        // este widget te lleva a la vista de calendarios
        <div className="container-widget-calendar">
            <div className="calendar__days">
                <div>Mon </div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>
            <div className="linea"></div>

            <Link to="/MonthSquare">
                <img
                    src={JANUARY}
                    alt="calendario"
                    width="100%"
                    heigth="100%"
                />
            </Link>
        </div>
    );
};

export default WidgetCalendar;
