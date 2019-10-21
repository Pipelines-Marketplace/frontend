import React from "react";
import "./taskdetail.css";
import TaskInfo from "../task-info/TaskInfo";
import TaskRating from "../task-rating/TaskRating";
import TaskDescription from "../task-description/TaskDescription";


/* here code is for description of each task (page 2)       */
const TaskDetail: React.FC = () => {
    return (
    
        <div className="main">

            <div className="taskinfo">
                <TaskInfo />

            </div>
            <div className="taskdescription">

                <TaskDescription />
            </div>
            <div className="rating">

                <TaskRating />
            </div>


            
        </div>
    );
}

export default TaskDetail;