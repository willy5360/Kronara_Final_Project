import React, { useEffect, useState } from "react";

const WeatherWidget = () => {

    const api = {
        key:"3455f2f7c7ed53498ee13045cf4313b1",
        base:"api.openweathermap.org/data/2.5/weather?"
    }

    const [city, setCity] = useState("Madrid")
    const [ weather, setWeather] = useState({})

    useEffect(()=>{

        fetch(`${api.base}q=${city}&units=metric&APPID=${api.key}`)
            .then(response => {
                console.log("aqui esta el response del wether en modo compenente", response);
				if (response.ok) return response.json();
				throw new Error("fail loading weather");
			})
            .then(responseAsJSON => {
                console.log("aqui esta el response asjson", responseAsJSON);
                setWeather(responseAsJSON)
            })
            .catch(error => {
				console.log(error);
			})
    },[])

    return(
        <div className="weather_container">
            {weather.name}
        </div>
    )
}

export default WeatherWidget;