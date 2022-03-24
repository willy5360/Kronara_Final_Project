import React from "react";
import { Link } from "react-router-dom";
import MemberWidget from "./memberWidget.jsx";
import HomeTabletView from "../pages/homeTablet.jsx";
import "../../styles/navbarTabletview.scss";

const NavbarTabletView = () => {
    const logOut = () => {
        localStorage.removeItem("acces_token");
        return "/";
    };

    return (
        <div className="navbar_tablet_view_container">
            <div className="navbar_tablet_view_kronara">
                <Link to="/HomeTabletView">
                    <h2>Kronara</h2>
                </Link>
            </div>
            <div className="navbar_tablet_view_users">
                <MemberWidget />
            </div>

            <div className="navbar_tablet_view_settings">
                <input type="checkbox" id="drop-4" hidden />
                <label className="dropHeader dropHeader-4" htmlFor="drop-4">
                    <i className="fas fa-cogs"></i>
                </label>

                <div className="dropdown dropdown-4">
                    <div className="settings__item">
                        <Link to={logOut()}>
                            {/* {localStorage.removeItem("acces_token")} */}
                            <p>Sign out</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarTabletView;
