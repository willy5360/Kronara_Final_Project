import React, { Fragment, useEffect, useState } from "react";
const holidayURL = "https://holidayapi.com/v1/holidays?pretty&key=923cf280-3c74-4e23-b6b6-1173f9e41ca3&country=ES&year=2020"

const Holiday = () => {

    
    
    const [dayholy, setDayholy] = useState({})

    useEffect(()=>{
        fetch(holidayURL)
        .then(response => {
            console.log("aqui esta el response de holidya", response)
            if (response.ok) {
                return response.json();
            }
            throw new Error("fail on loading holyday");
        })
        .then(resposeAsJSON => {
            console.log("aqui esta el reponseasjson del holydays",resposeAsJSON)
            setDayholy(resposeAsJSON)
        })
        .catch(error => {
            console.log(error.messsage);
        })
    },[])



    return (
        <Fragment>
            <div className="holyday_day">
                {""}
            </div>
        </Fragment>
    )

}

export default Holiday;
