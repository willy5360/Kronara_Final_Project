import React, { useEffect, useState, Fragment, useContext } from "react";
import Task from "./task.jsx";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext.js";

const List = () => {
    const INPUT = document.querySelector("#task");
    const [list, setList] = useState([]);
    const [toDoList, setToDoList] = useState([]);
    const { register, handleSubmit } = useForm();
    const [update, setUpdate] = useState(false);
    const { store, actions } = useContext(Context);
    const onSubmit = (data) => {
        actions.submitTask(data);
        INPUT.value = "";
    };

    useEffect(() => {
        if (store.list.length != 0) {
            setToDoList(
                store.list.map((taskDict, index) => {
                    return (
                        <Task
                            key={index.toString()}
                            task={taskDict}
                            item={taskDict.item}
                            id={taskDict.id}
                            deleted={actions.deleteTask}
                        />
                    );
                })
            );
        }
    }, [store.list]);

    return (
        <div className="main__list__container">
            <div className="to__do__form">
                <h1>To do list</h1>
                <form
                    className="list-wrapper"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label htmlFor="task"></label>
                    <input
                        type="text"
                        placeholder="Add a task"
                        {...register("item")}
                        id="task"
                    ></input>
                </form>
                <ul>{toDoList}</ul>
            </div>
        </div>
    );
};

export default List;
