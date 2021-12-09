import React, { useEffect, useState, Fragment } from "react";
import Task from "./task.jsx";
import { useForm } from "react-hook-form";

const List = () => {
	const INPUT = document.querySelector("input");
	const [list, setList] = useState([]);
	const [toDoList, setToDoList] = useState("");
	const { register, handleSubmit } = useForm();
  	const onSubmit = data => console.log(data);

	useEffect(() => {
		fetch("https://salmon-smelt-5qlkark7.ws-eu21.gitpod.io/", {
			method: "GET"
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Fail");
				}
				return response.json();
			})
			.then(responseAsJason => {
				setList(responseAsJason);
				console.log(responseAsJason);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/gloria", {
			method: "PUT",
			body: JSON.stringify(list),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("fail updating");
				}
				return response.json();
			})
			.then(responseAsJason => {
				console.log(responseAsJason);
			})
			.catch(error => {
				console.log(error);
				
			});
	}, [list]);

	useEffect(() => {
		setToDoList(
			list.map((task, index) => {
				return (
					<Task
						label={task.label}
						key={index.toString()}
						delete={deleteTask}
						id={index.toString()}
					/>
				);
			})
		);
	}, [list]);

	const deleteTask = indexList => {
		setList(list.filter((_, index) => index != indexList));
		console.log(indexList);
	};

	return (
		<div className="main__list__container">
			<div className="lineas">
			<hr></hr>
			<hr></hr>
			<hr></hr>
			<hr></hr>
			<hr></hr>
			<hr></hr>
			<hr></hr>
			<hr></hr>
			<hr></hr>
			</div>
			<div className="to__do__form">
			<h1>To do list</h1>
			<form
				className="list-wrapper"
				method="post"
				onSubmit={event => {
					event.preventDefault();
					setList([...list, { label: INPUT.value, done: false }]); // se guarda el imput como diccionario
					INPUT.value = "";
				}}>
				<label htmlFor="task"></label>
				<input type="text" placeholder="Add a task" className="list__add" {...register("task")} id="task"></input>
			</form>
			<ul >{toDoList}</ul>
			</div>

			</div>
	);
};

export default List;
