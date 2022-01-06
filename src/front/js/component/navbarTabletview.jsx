import React from "react";
import { Link } from "react-router-dom";
import MemberWidget from "./memberWidget.jsx";
import "../../styles/navbarTabletview.scss";

const NavbarTabletView = () => {
    return (
        <div className="navbar_tablet_view_container">
            <div className="navbar_tablet_view_kronara">
                <h2>Kronara</h2>
            </div>
            <div className="navbar_tablet_view_users">
                <MemberWidget />
            </div>
            <div className="navbar_tablet_view_settings">
                <Link to="/">
                    <i className="fas fa-sliders-h"></i>
                </Link>
            </div>
        </div>
    );
};

export default NavbarTabletView;
