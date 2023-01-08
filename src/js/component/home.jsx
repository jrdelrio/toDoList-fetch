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
	const addTask = (taskObj) => {

		// la agrego localmente
		let aux = toDos;
		aux.push(taskObj);
		setToDos(aux);
		
		// fetch PUT		
		fetch(url, {
			method: 'PUT',
			headers: {"Content-Type": "application/json"},
			body: toDos,
			redirect: 'follow'
		  })
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
		setInputValue('')

	};

	const removeTask = (taskToTrue) => { 
		let auxToDos = toDos;
		for (let task of auxToDos){
			if (task === taskToTrue){
				task.done = true
			}};
		setToDos(auxToDos)
										  
		fetch(url, 
		{
			method: 'PUT',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(toDos),
			redirect: 'follow'
		}
		)
		.then(response => response.text())
		.then(data => console.log(data))
		.catch(error => console.log('error', error));
		fillToDoList()
	};

	const setInputValueFunction = (arg) => {setInputValue(arg)};

	// fetch GET
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
							headers:{'Content-Type': 'application/json'},
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
		return (
				<div className="container">
					<h1>To Do List</h1>
					<Input value = {inputValue}
						setToDos = {addTask}
						toDos = {toDos}
						updateApiList = {updateApiList}
						setVar = {setInputValueFunction}
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