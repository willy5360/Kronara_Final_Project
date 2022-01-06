import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import FormSignUp from "./pages/formulario_sign_up.jsx";
import FormLogin from "./pages/form-login.jsx";
import { HomeTabletView } from "./pages/homeTablet.jsx";
import MonthSquare from "./pages/monthSquare.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/FormSignUp" element={<FormSignUp />} />
                <Route path="/FormLogin" element={<FormLogin />} />
                <Route path="/HomeTabletView" element={<HomeTabletView />} />
                <Route path="/MonthSquare" element={<MonthSquare />} />
            </Routes>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
