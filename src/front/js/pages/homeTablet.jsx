import React, { useContext } from "react";
import NavbarTabletView from "../component/navbarTabletview.jsx";
import WeatherWidget from "../component/weatherWidget.jsx";
import HabitsWidget from "../component/habitsWidget.jsx";
import ButtonHumedity from "../component/button-humedity.jsx";
import ButtonTemperature from "../component/button-temperature.jsx";
import WidgetImgFamily from "../component/widget-img-family.jsx";
import WidgetCalendar from "../component/widget-calendar.jsx";
import WidgetDomotic from "../component/widget-domotic.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/homeTabletView.scss";
import List from "../component/list.jsx";

export const HomeTabletView = () => {
    const { store, action } = useContext(Context);

    return (
        <div className="home_tablet_view">
            <div className="">
                <NavbarTabletView />
            </div>
            <div className="wrapper">
                <div className="one">
                    <div className="hi-member">
                        <h4>Good Afternoon, {store.currentHome.name} </h4>
                    </div>
                </div>
                <div className="two">
                    <WeatherWidget />
                </div>
                <div className="three">
                    <WidgetImgFamily />
                </div>
                <div className="four">
                    <WidgetCalendar />
                </div>
                <div className="five">
                    <ButtonHumedity />
                    <ButtonTemperature />
                </div>
                <div className="six">
                    <HabitsWidget />
                </div>
                <div className="seven">
                    <List />
                </div>
                <div className="eight">
                    <WidgetDomotic />
                </div>
            </div>
        </div>
    );
};
