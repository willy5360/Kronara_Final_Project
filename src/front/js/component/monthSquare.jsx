import React, { useEffect, useState } from "react";
import DaySquare from "./daySquare.jsx";

const MonthSquare = () => {
	const today = new Date();
	const NumbersToDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	const [calendar, setCalendar] = useState([]);
	const [currentDay, setCurrentDay] = useState(today.getDate());
	const [week, setWeek] = useState([]);
	const [month, setMonth] = useState(today.getMonth());
	const [year, setYear] = useState(today.getFullYear());

	const IsLeapYear = year => {
		return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
	};

	const numberToMonth = [
		{
			month: "January",
			day: 31
		},
		{
			month: "February",
			day: IsLeapYear(year) ? 29 : 28
		},
		{
			month: "March",
			day: 31
		},
		{
			month: "April",
			day: 30
		},
		{
			month: "May",
			day: 31
		},
		{
			month: "June",
			day: 30
		},
		{
			month: "July",
			day: 31
		},
		{
			month: "August",
			day: 31
		},
		{
			month: "September",
			day: 30
		},
		{
			month: "October",
			day: 31
		},
		{
			month: "November",
			day: 30
		},
		{
			month: "December",
			day: 31
		}
	];

	let firstDay = new Date(year, month, 1).getDay() - 1; //me devueleve el primer dia en numero
	console.log("aqui esta el firstDay", NumbersToDays[firstDay]); // y esto me devuelve un string

	const month_days = Array.from({ length: numberToMonth[month].day }, (_, i) => i + 1);

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
							isNumberOne={` ${NumbersToDays[firstDay]}`} //agrega una clase css si conincide con el dia inicial
						/>
					);
				}
				// condicional que pinta en el dia actual del mes
				if (dayNumber == currentDay && month == today.getMonth() && year == today.getFullYear()) {
					return (
						<DaySquare
							key={index.toString()}
							day={dayNumber}
							istoday={"day_square_today"}
							isNumberOne={""}
						/>
					);
				} else {
					return <DaySquare key={index.toString()} day={dayNumber} istoday={"day_square"} isNumberOne={""} />;
				}
			})
		);
		setWeek(
			NumbersToDays.map((day, index) => {
				return <li key={index.toString()}>{day}</li>;
			})
		);
	}, [month, year]);

	return (
		<div className="main__container__calendar">
			<button
				className="calendar_month_previous_button"
				onClick={() => (month == 0 ? setMonth(11) : setMonth(month - 1))}>
				<i className="fas fa-chevron-circle-left"></i>
			</button>
			<div className="calendar">
				<div className="calendar_year">
					<button className="calendar_year_previous_button" onClick={() => setYear(year - 1)}>
						<i className="fas fa-chevron-circle-left"></i>
					</button>
					{year}
					<button className="calendar_year_next_button" onClick={() => setYear(year + 1)}>
						<i className="fas fa-chevron-circle-right"></i>
					</button>
				</div>
				<div className="calendar_month_name">{numberToMonth[month].month}</div>
				<ul className="calendar_days">{week}</ul>
				<div className="calendar_main_month">{calendar}</div>
			</div>
			<div className="calendar__void__todoList"></div>
			<button
				className="calendar_month_next_button"
				onClick={() => (month == 11 ? setMonth(0) : setMonth(month + 1))}>
				<i className="fas fa-chevron-circle-right"></i>
			</button>
		</div>
	);
};

export default MonthSquare;
