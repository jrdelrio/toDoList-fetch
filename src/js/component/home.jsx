import React, { useEffect, useState } from "react";
import Task from "./task.jsx"
import Input from "./input.jsx";
import Bottom from "./bottom.jsx"

//create your first component
const Home = () => {

	//my states
	const [ inputValue, setInputValue ] = useState('');
	const [ toDos, setToDos ] = useState([]);
	const [ url, setUrl ] = useState("https://assets.breatheco.de/apis/fake/todos/user/jrdelrio");

	// aux functions
	const setInputValueFunction = (arg) => {setInputValue(arg)};
	const setToDosFunction = (arg) => {setToDos([...toDos, arg])};
	const removeTask = (taskToRemove) => {
		const filteredList = toDos.filter(task => task !== taskToRemove)
		setToDos(filteredList)
	}

	function fillToDoList(url){
		fetch(url)
		.then((resp)=>resp.json())
		.then((data)=>{setToDos(data)})
		.catch((error) => console.error("Error: ", error));
	};

	// funcion para agregar una tarea con fetch PUT
	const updateApiList = () => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/jrdelrio";
		const options = {
							method:'PUT',
							headers:{
										'Content-Type': 'application/json'
									},
							body: JSON.stringify(toDos)
						};

		fetch(url, options)
		.then((resp)=> resp.json())
		.then((data)=>{
			console.log('Api list updated.')
			console.log(data)
				})
	};
	
	// funcion llenar lista de tareas
	useEffect(()=>{
		fillToDoList(url);
	}, []);

	if (toDos !== []){
		console.log('imprimir toDos')
		console.log(toDos)
	}

	if (toDos !== []){
		return (
				<div className="container">
					<h1>To Do List</h1>
					<Input value = {inputValue} 
						setVar = {setInputValueFunction}
						setToDos = {setToDosFunction}
						toDos = {toDos}
						updateApiList = {updateApiList}
						/>

					<ul>
					{toDos.map((task, index) => {
						if (task.done === false) {
							return(<Task key={index} task={task} remove={removeTask}/>)
						}
						})}
					</ul>
					<Bottom toDos={toDos}/>
				</div>
		);
	}else{
		return(
			<p>loading...</p>
		)
	}
};
export default Home;