import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/widget-calendar.scss";
import MonthSquare from "../pages/monthSquare.jsx";

const WidgetCalendar = () => {
    return (
        // este widget te lleva a la vista de calendarios
        <div className="container-widget-calendar">
            <Link to="/MonthSquare">
                <h2>Enero</h2>
                <img
                    src="https://www.pexels.com/photo/5386754/download/?search_query=calendario&tracking_id=k2nu7k9pve"
                    alt="calendario"
                    width="100%"
                    heigth="100%"
                />
            </Link>
        </div>
    );
};

export default WidgetCalendar;
