import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import DaySquare from "./daySquare.jsx";
import "../../styles/daySquare.scss";

const MonthSquare = () => {
	const today = new Date();
	const NumbersToDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	const [calendar, setCalendar] = useState([]);
	const [week, setWeek] = useState([]);
	const [month, setMonth] = useState(today.getMonth());
	const [year, setYear] = useState(today.getFullYear());

	const IsLeapYear = year => {
		return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
	};

	const { store, actions } = useContext(Context)
    const [holidayDate, setHolidayDate] = useState({
            name:[],
            month:[],
            day:[]
        })


    // useEffect(()=>{
        
    //     if (store.holiday.length != 0){
    //         setHolidayDate(
    //             {    
    //                 name: [store.holiday.map(day => day.name)], 
    //                 month: [store.holiday.map(day => new Date(day.date).getMonth())],
    //                 day: [store.holiday.map(day => new Date(day.date).getDate())]   
    //             }
    //         )
    //     }

    // },[store.holiday])

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

	const month_days = Array.from({ length: numberToMonth[month].day }, (_, i) => i + 1);

	useEffect(() => {

		if (store.holiday.length != 0){
            setHolidayDate(
                {    
                    name: [store.holiday.map(day => day.name)], 
                    month: [store.holiday.map(day => new Date(day.date).getMonth())],
                    day: [store.holiday.map(day => new Date(day.date).getDate())]   
                }
            )
        }
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
				
				// for (let k in holidayDate.month){
				// 	console.log(holidayDate.month[k])
					for (let j in holidayDate.day){
						console.log(holidayDate.day[j])
						if(dayNumber == holidayDate.day[j]){
							return (
								<DaySquare
									key={index.toString()}
									day={dayNumber}
									istoday={"day_square--holiday"}
									isNumberOne={""}
								/>
							);
						}
					}
				// }
			
				// condicional que pinta en el dia actual del mes
				if (dayNumber == today.getDate() && month == today.getMonth() && year == today.getFullYear()) {
					return (
						<DaySquare
							key={index.toString()}
							day={dayNumber}
							istoday={"day_square--today"}
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
	}, [month, year, store.holiday]);

	return (
		<div className="main__container">
			<button
				className="main__container--button"
				onClick={() => (month == 0 ? setMonth(11) : setMonth(month - 1))}>
				<i className="fas fa-chevron-circle-left"></i>
			</button>
			<div className="calendar">
				<div className="calendar__year">
					<button className="calendar__year--previous_button" onClick={() => setYear(year - 1)}>
						<i className="fas fa-chevron-circle-left"></i>
					</button>
					{year}
					<button className="calendar__year--next_button" onClick={() => setYear(year + 1)}>
						<i className="fas fa-chevron-circle-right"></i>
					</button>
				</div>
				<div className="calendar__currentMonth">{numberToMonth[month].month}</div>
				<ul className="calendar__weekDays">{week}</ul>
				<div className="calendar_main_month">{calendar}</div>
			</div>
			<div className="calendar__void__todoList"></div>
			<button
				className="main__container--button"
				onClick={() => (month == 11 ? setMonth(0) : setMonth(month + 1))}>
				<i className="fas fa-chevron-circle-right"></i>
			</button>
		</div>
	);
};

export default MonthSquare;
