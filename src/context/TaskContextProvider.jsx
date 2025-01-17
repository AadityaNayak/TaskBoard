import React, { useState } from "react";
import TaskContext from "./TaskContext";

const TaskContextProvider = ({children}) => {
    const [taskList, settaskList] = useState([]);

    return(
        <TaskContext.Provider value={{taskList, settaskList}}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider;