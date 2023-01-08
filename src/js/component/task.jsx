import React from "react";

const Task = (props) => {
    console.log(props.task)
    return(
        <li>
            {props.task.label} 
            <i className="fa-regular fa-trash-can" 
            onClick={()=>{props.remove(props.task);
                console.log(props.task)
            }}></i>
        </li>
    )
};

export default Task