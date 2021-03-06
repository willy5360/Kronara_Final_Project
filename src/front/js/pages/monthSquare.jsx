import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import DaySquare from "../component/daySquare.jsx";
import WeatherWidget from "../component/weatherWidget.jsx";
import "../../styles/daySquare.scss";
import NavbarTabletView from "../component/navbarTabletview.jsx";
import Day from "../component/day.jsx";
import List from "../component/list.jsx";

const MonthSquare = () => {
    const { store, actions } = useContext(Context);
    const today = new Date();
    const weekDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const [calendar, setCalendar] = useState([]);
    const [week, setWeek] = useState([]);
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    const IsLeapYear = (year) => {
        return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
    };

    const numberToMonth = [
        {
            month: "January",
            day: 31,
        },
        {
            month: "February",
            day: IsLeapYear(year) ? 29 : 28,
        },
        {
            month: "March",
            day: 31,
        },
        {
            month: "April",
            day: 30,
        },
        {
            month: "May",
            day: 31,
        },
        {
            month: "June",
            day: 30,
        },
        {
            month: "July",
            day: 31,
        },
        {
            month: "August",
            day: 31,
        },
        {
            month: "September",
            day: 30,
        },
        {
            month: "October",
            day: 31,
        },
        {
            month: "November",
            day: 30,
        },
        {
            month: "December",
            day: 31,
        },
    ];

    const firstDay = new Date(year, month, 1).getDay() - 1;

    const month_days = Array.from(
        { length: numberToMonth[month].day },
        (_, i) => i + 1
    );

    useEffect(() => {
        actions.getEvent();
    }, [store.currentHome]);

    useEffect(() => {
        setCalendar(
            month_days.map((dayNumber, index) => {
                // condicional que empuja el dia 1 correspondiente al mes seleccionado
                if (dayNumber == 1) {
                    return (
                        <DaySquare
                            key={index.toString()}
                            day={dayNumber}
                            istoday={"day_square"}
                            isNumberOne={` ${weekDays[firstDay]}`} //agrega una clase css si conincide con el dia inicial
                            holidayName={""}
                            month={month}
                            year={year}
                        />
                    );
                }

                // condicional que pinta los festivos en el calendario
                for (let DATE in store.holiday) {
                    if (
                        dayNumber ==
                            new Date(store.holiday[DATE].date).getDate() &&
                        month == new Date(store.holiday[DATE].date).getMonth()
                    ) {
                        return (
                            <DaySquare
                                key={index.toString()}
                                day={dayNumber}
                                istoday={"day_square"}
                                isNumberOne={""}
                                holidayName={store.holiday[DATE].name}
                                appointmentDate={""}
                                month={month}
                                year={year}
                            />
                        );
                    }
                }

                //condicional que pinta si hay algun appointment en el dia

                for (let DATE in store.currentAppointments) {
                    if (
                        dayNumber ==
                            new Date(
                                store.currentAppointments[DATE].date
                            ).getDate() &&
                        month ==
                            new Date(
                                store.currentAppointments[DATE].date
                            ).getMonth() &&
                        year ==
                            new Date(
                                store.currentAppointments[DATE].date
                            ).getFullYear()
                    ) {
                        return (
                            <DaySquare
                                key={index.toString()}
                                day={dayNumber}
                                istoday={"day_square"}
                                isNumberOne={""}
                                holidayName={""}
                                appointmentDate={
                                    store.currentAppointments[DATE].appointment
                                }
                                month={month}
                                year={year}
                            />
                        );
                    }
                }

                // condicional que pinta en el dia actual del mes
                if (
                    dayNumber == today.getDate() &&
                    month == today.getMonth() &&
                    year == today.getFullYear()
                ) {
                    return (
                        <DaySquare
                            key={index.toString()}
                            day={dayNumber}
                            istoday={"day_square today"}
                            isNumberOne={""}
                            holidayName={""}
                            appointmentDate={""}
                            month={month}
                            year={year}
                        />
                    );
                } else {
                    return (
                        <DaySquare
                            key={index.toString()}
                            day={dayNumber}
                            istoday={"day_square"}
                            appointmentDate={""}
                            isNumberOne={""}
                            month={month}
                            year={year}
                        />
                    );
                }
            })
        );
        setWeek(
            weekDays.map((day, index) => {
                return <li key={index.toString()}>{day}</li>;
            })
        );
    }, [
        month,
        year,
        store.holiday,
        store.currentAppointments,
        store.currentMember,
        store.member,
    ]);

    return (
        <Fragment>
            <div className="main__container">
                <NavbarTabletView />
                <div className="main__container--calendarContainer">
                    <button
                        className="main__container--button"
                        onClick={() =>
                            month == 0 ? setMonth(11) : setMonth(month - 1)
                        }
                    >
                        <i className="fas fa-chevron-circle-left"></i>
                    </button>
                    <div className="calendar">
                        <div className="calendar__year">
                            <button
                                className="calendar__year--previous_button"
                                onClick={() => setYear(year - 1)}
                            >
                                <i className="fas fa-chevron-circle-left"></i>
                            </button>
                            {year}
                            <button
                                className="calendar__year--next_button"
                                onClick={() => setYear(year + 1)}
                            >
                                <i className="fas fa-chevron-circle-right"></i>
                            </button>
                        </div>
                        <div className="calendar__currentMonth">
                            {numberToMonth[month].month}
                        </div>
                        <ul className="calendar__weekDays">{week}</ul>
                        <div className="calendar__main_month">{calendar}</div>
                    </div>
                    <div className="calendar__lefside">
                        <WeatherWidget />
                        <div className="calendar__void__todoList">
                            <List />
                        </div>
                    </div>
                    <button
                        className="main__container--button"
                        onClick={() =>
                            month == 11 ? setMonth(0) : setMonth(month + 1)
                        }
                    >
                        <i className="fas fa-chevron-circle-right"></i>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default MonthSquare;
