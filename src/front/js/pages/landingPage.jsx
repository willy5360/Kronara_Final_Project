import React from "react";
import "../../styles/landingPage.scss";
import Robot from "../../img/—Pngtree—high-tech brain_5406718.png";
import SmartHouse from "../../img/smart-home.png";

export const LandingPage = () => {
    return (
        <div className="landingPage__container">
            <div className="landingPage__logo">
                <img src={Robot} className="roboPhoto" />
                <h1 className="landingPage__mainTitle">Kronara</h1>
                <p className="landingPage__slogan">SmartHousing made easy</p>
            </div>

            <div className="landingPage__features">
                <div className="landingPage__features__one">
                    <div className="landingPage__features__one--text">
                        <h1>Have all your task in one place</h1>
                        <p>holi</p>
                    </div>
                    <img src={SmartHouse} alt="" />
                </div>
            </div>
        </div>
    );
};
