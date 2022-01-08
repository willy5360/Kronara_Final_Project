import React, { useState } from "react";
import Switch from "react-switch";
import "../../styles/toggle-button-domotic.scss";

const Toggle = () => {
    const [checked, setChecked] = useState(false);

    const handleChange = (nextChecked) => {
        setChecked(nextChecked);
    };

    return (
        <div className="example">
            <Switch
                onChange={handleChange}
                checked={checked}
                className="react-switch"
            />
        </div>
    );
};

export default Toggle;
