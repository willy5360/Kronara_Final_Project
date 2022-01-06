import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/habitsWidgets.scss";

const HabitsWidget = () => {
    const { store, actions } = useContext(Context);
    const [habit, setHabits] = useState([]);

    let randomized = Math.floor(Math.random() * 20) + 1;
    console.log("aca esta el habit random", randomized);

    useEffect(() => {
        setHabits(
            store.listHabits.map((habit, index) => {
                if (habit.id === randomized) {
                    return <p key={index.toString()}>{habit.habits}</p>;
                }
            })
        );
    }, [store.listHabits]);

    return (
        <div className="habitsWidget_box_container">
            <h3>{habit}</h3>
        </div>
    );
};

export default HabitsWidget;
