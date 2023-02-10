import React, { useEffect, useState } from "react";

const Bottom = (props) => {

    const [ aux, setAux ] = useState([]);
    console.log(aux)
    if (aux !== []){
        console.log('pre aux')
        console.log(aux)
        console.log('post aux')
    }
    

    if (props.toDos.includes(undefined) === false){
        let taskNum = props.toDos.filter((task) => task.done === false)
            return(
                <div className="bottom">
                    <div className="total-tasks">{taskNum === 0 ? 0 : taskNum.length} Tasks <i className="fa-regular fa-trash-can clearAll" onClick={props.clear}> clear</i></div>
                </div>
            )
    }

    else if (props.toDos.includes(undefined)){
    
        return(
            <div className="bottom">
                <div className="total-tasks">## Tasks <i className="fa-regular fa-trash-can clearAll" onClick={props.clear}> clear</i></div>
            </div>
    )}
};

export default Bottom;