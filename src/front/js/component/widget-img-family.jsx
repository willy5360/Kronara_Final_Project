import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/widget-img-family.scss";

const WidgetImgFamily = () => {
    return (
        // este widget tendria que agregar las fotos que elijan los usuarios
        <div className="widgetImgFamily_box_container">
            <img
                src="https://www.pexels.com/photo/697244/download/?search_query=group&tracking_id=k2nu7k9pve"
                alt="photo group"
                width="100%"
                height="100%"
            />
        </div>
    );
};

export default WidgetImgFamily;
