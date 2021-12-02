import React, { useEffect, useState, Fragment } from "react";
import Task from "./task.jsx";

const List = () => {
	const INPUT = document.querySelector("input");
	const [list, setList] = useState([]);
	const [toDoList, setToDoList] = useState("");
	// const [failOnUpdating, setFailOnUpdating] = useState("");
	// const [update, setUpdate] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/gloria", {
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
				// setFailOnUpdating(error.message);
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
		<frangement>
			{/* {failOnUpdating && <h1>{failOnUpdating}</h1>} */}
			{/* setUpdate()  */}
			<h1>To do list</h1>
			<form
				className="list-wrapper"
				method="post"
				onSubmit={event => {
					event.preventDefault();
					setList([...list, { label: INPUT.value, done: false }]); // se guarda el imput como diccionario
					INPUT.value = "";
				}}>
				<input type="text" placeholder="Add a task"></input>
			</form>
			<ul>{toDoList}</ul>
		</frangement>
	);
};

export default List;
