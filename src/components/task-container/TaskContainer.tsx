import React from 'react';
import {TaskPropObject} from '../task/Task';
import Task from '../task/Task';
import {mockData} from '../../services/mockdata';
const TaskContainer: React.FC = (props) => {
  return (
    <div>
      {
        mockData.map((task: any) => {
          const taskData: TaskPropObject = {
            id: task['id'],
            name: task['Name'],
            tags: task['Tags'],
            description: task['Description'],
            downloads: 0,
            rating: 0,
          };
          return <Task key={task['id']} task={taskData} />;
        })}
    </div>
  );
};

export default TaskContainer;
