import React from "react";
import "../../styles/landingPage.scss";
import Robot from "../../img/—Pngtree—high-tech brain_5406718.png";
import SmartHouse from "../../img/smart-home.png";
import SmartHouse2 from "../../img/AdobeStock_217810633_klein.jpg";
import SmartHouse3 from "../../img/Home-Automation1.jpg";
// import WeatherWidget from "../component/weatherWidget.jsx";

export const LandingPage = () => {
    return (
        <div className="landingPage__container">
            <div className="landingPage__logo">
                <img src={Robot} className="roboPhoto" />
                <h1 className="landingPage__mainTitle">Kronara</h1>
                <p className="landingPage__slogan">SmartHousing made easy</p>
                {/* <WeatherWidget /> */}
            </div>

            <div className="landingPage__features">
                <div className="landingPage__features__one">
                    <div className="landingPage__features__one--text">
                        <h1>Have all your task in one place</h1>
                        <p>Keep your task organized!</p>
                    </div>
                    <img src={SmartHouse} alt="" />
                </div>
                <div className="landingPage__features__two">
                    <img src={SmartHouse2} alt="" />
                    <div className="landingPage__features__two--text">
                        <h1>Multi-device, Intuitive Design and Elegant</h1>
                    </div>
                </div>
                <div className="landingPage__features__three">
                    <div className="landingPage__features__three--text">
                        <h1>
                            With Kronara you can control your home even when you
                            are not there
                        </h1>
                        <p>Because it is in your hands!</p>
                    </div>
                    <img src={SmartHouse3} alt="" />
                </div>
            </div>
        </div>
    );
};
