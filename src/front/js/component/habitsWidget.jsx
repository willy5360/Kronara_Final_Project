import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/habitsWidgets.scss";

const HabitsWidget = () => {
    const { store, actions } = useContext(Context);
    const [habit, setHabits] = useState([]);

    let randomized = Math.floor(Math.random() * 20) + 1;

    useEffect(() => {
        setHabits(
            store.listHabits.map((habit, index) => {
                if (habit.id === randomized) {
                    return <p key={index.toString()}>{habit.habits}</p>;
                }
            })
        );
    }, [store.listHabits]);

    return <div className="habitsWidget_box_container">{habit}</div>;
};

export default HabitsWidget;
