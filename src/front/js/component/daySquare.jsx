import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/modal.scss";
import HolidayCircle from "./holidayCircle.jsx";

{
    /* <a href="#modal1" />
      <div id="modal1" class="modalmask">
        <div className="modalbox movedown">
          <a href="#close" title="Close" className="close">
            X
          </a>
          <h2>DESLIZAR</h2>
          <p>
            La ventana modal aparece por arriba y se desliza hasta su posición.
            Un efecto simple pero elegante.
          </p>
          <p>
            Aquí puedes incluir cualquier cosa como vídeos, mapas,
            formularios...
          </p>
        </div>
      </div>
      <span>{props.day}</span> */
}

const DaySquare = (props) => {
    const clicked = () => {
        window.alert(new Date(props.year, props.month, props.day));
    };
    if (props.holidayName) {
        return (
            <div
                className={props.istoday.concat(props.isNumberOne)}
                onClick={""}
            >
                <HolidayCircle />
                <span className="day_square--holidayName">
                    <div>{props.holidayName}</div>
                </span>
                <Link className="day_square--link" to={"/day"}>
                    <span className="day_square--dayNumber">{props.day}</span>
                </Link>
            </div>
        );
    } else {
        return (
            <div
                className={props.istoday.concat(props.isNumberOne)}
                onClick={""}
            >
                <span className="day_square--holidayName">
                    <div>{props.holidayName}</div>
                </span>
                <Link className="day_square--link" to={"/day"}>
                    <span className="day_square--dayNumber">{props.day}</span>
                </Link>
            </div>
        );
    }
};

DaySquare.propTypes = {
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
    istoday: PropTypes.string,
    isNumberOne: PropTypes.string,
    holidayName: PropTypes.string,
};

export default DaySquare;
