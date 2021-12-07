import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

const Holiday = () => {

    const { store, actions } = useContext(Context)
    const [holidayDate, setHolidayDate] = useState({
            name:[],
            month:[],
            day:[]
        })


    useEffect(()=>{
        
        if (store.holiday.length != 0){
            setHolidayDate(
                {    
                    name: [store.holiday.map(day => day.name)], //me devuelve un array de los nombres de los festivos
                    month: [store.holiday.map(day => new Date(day.date).getMonth())], //me devuelve un array de los meses en numeros 0-11
                    day: [store.holiday.map(day => new Date(day.date).getDate())]   //me devuelve un array de los dias en numeros del 1-31
                }
            )
        }

    },[store.holiday])
    
    // for (let i  in holidayDate.name){
    //     console.log("aqui esta el loop", holidayDate.name[i])
    //     for (let k in holidayDate.month){
    //         console.log(holidayDate.month[k])
    //         for (let j in holidayDate.day){
    //             console.log(holidayDate.day[j])
    //         }
    //     }
    // }

    console.log("aqui esta la lista holidayssss", holidayDate)


    return (
        <Fragment>
            <div className="holyday_day">
                {""}
            </div>
        </Fragment>
    )

}

export default Holiday;
