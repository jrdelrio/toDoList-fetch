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

	// fetch POST para crear usuario

	let requestOptions = {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body: [],
		redirect: 'follow'
	  };
	  
	fetch(url, requestOptions)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));
	
	useEffect(()=>{
		fetch(url)
		.then((resp)=>resp.json())
		.then((data)=>{setToDos(data)})
		.catch((error) => console.error("Error: ", error));
	}, []);

	//add task
	function addTask (taskObj) {

		// la agrego localmente
		let aux = toDos;
		aux.push(taskObj);
		setToDos(aux);

		// fetch PUT		
		fetch(url, {
			method: 'PUT',
			headers: {"Content-Type": "application/json"},
			body:  JSON.stringify(aux),
			redirect: 'follow'
		  })
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
		setInputValue('')

	};

	// remove task
	function removeTask (taskToTrue) { 
		
		console.log('eliminando task');
		// la agrego localmente
		const taskAux = taskToTrue;
		taskAux.done = true;

		let aux = toDos.map(task => {
			if (task === taskToTrue){
				return taskAux}
			else{
				return task
			}
		})

		console.log(aux)


		setToDos(aux);
										  
		fetch(url, 
		{
			method: 'PUT',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(aux),
			redirect: 'follow'
		}
		)
		.then(response => response.text())
		.then(data => console.log(data))
		.catch(error => console.log('error', error));
		setInputValue('')
	};

	const setInputValueFunction = (arg) => {setInputValue(arg)};

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

	//clear function
	const clearAll = () => {

		const allTrue = toDos.map(task => (
			{label: task.label, 
			done: true}
			));

		console.log(allTrue);

		fetch(url, {
			method: 'PUT',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(allTrue),
			redirect: 'follow'
		  })
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error: ', error));
		setInputValue('');
		setToDos(allTrue)
	};
	
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
					
					{console.log(toDos)}
					{toDos.map((task, index) => {
						if(task !== undefined){
							if (task.done === false) {
								return(<Task key={index} task={task} remove={removeTask}/>)
							}
						}})}
					</ul>

					<Bottom toDos={toDos} clear={clearAll}/>
					
				</div>
		);
	}else{
		return(
			<p>loading...</p>
		)
	}
};
export default Home;