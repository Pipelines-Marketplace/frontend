import React from "react"
import Task from "../task/Task";

const TaskContainer: React.FC = () => {
    return (
        <div>
            <div className="task-card">
                <Task />
            </div>
            <div className="task-card">
                <Task />
            </div>
            <div className="task-card">
                <Task />
            </div>
            <div className="task-card">
                <Task />
            </div>
        </div>
    );
}

export default TaskContainer;