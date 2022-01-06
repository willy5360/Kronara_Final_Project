import React, { useContext, useEffect, useState } from "react";

import "../../styles/widget-domotic.scss";
import ButtonLight from "../component/button-light.jsx";

const WidgetDomotic = () => {
    return (
        <div className="container-widget-domotic">
            <h2>Domotic</h2>
            <ButtonLight />
        </div>
    );
};

export default WidgetDomotic;
