import React, { useEffect, useState } from "react";

const Bottom = ({toDos}) => {

    let taskNum = toDos.filter((task) => task.done === false)

    return(
        <div className="bottom">
            <div className="total-tasks">{taskNum === 0 ? 0 : taskNum.length} Tasks <i className="fa-regular fa-trash-can clearAll" onClick={()=>null}> clear</i></div>
        </div>
    )
};

export default Bottom;