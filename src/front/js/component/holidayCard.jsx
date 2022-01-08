import React from "react";
import PropTypes from "prop-types";

const HolidayCard = (props) => {
    return props.name;
};

HolidayCard.propTypes = {
    name: PropTypes.string,
};

export default HolidayCard;
