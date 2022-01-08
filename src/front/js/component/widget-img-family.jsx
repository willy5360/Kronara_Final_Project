import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/widget-img-family.scss";

const WidgetImgFamily = () => {
    const [source, setSource] = useState("");

    const Images = [
        "https://images.pexels.com/photos/1036804/pexels-photo-1036804.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        "https://images.pexels.com/photos/2672979/pexels-photo-2672979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/452738/pexels-photo-452738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://www.pexels.com/photo/697244/download/?search_query=group&tracking_id=k2nu7k9pve",
        "https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ];

    useEffect(() => {
        setSource(Images[Math.floor(Math.random() * Images.length)]);
    }, [source]);

    return (
        // este widget tendria que agregar las fotos que elijan los usuarios
        <div className="widgetImgFamily_box_container">
            <img src={source} alt="photo group" width="100%" height="auto" />
        </div>
    );
};

export default WidgetImgFamily;
