import React from 'react';
import {connect} from 'react-redux';
import Task from '../task/Task';
import {fetchTaskSuccess} from '../redux/Actions/TaskAction';

export interface MockData{
  Name : string,
  Description : string,
  Rating : number,
  Downloads : number,
  YAML : string
}

const TaskContainer: React.FC = (props: any) => {
  
 
  let tempArr : any = [];
  React.useEffect(() => {
    props.fetchTaskSuccess();
  },[]);

  if (props.TaskData != null) {
    tempArr = props.TaskData.map((task: any) =>{
      const taskData: MockData = {
        Name: task['name'],
        Description: task['description'],
        Rating: 0,
        Downloads: 0,
        YAML: task['yaml'],
      };
      return taskData;
    });
  }
  
  return (
    <div>
      {
        tempArr.map((task: any) => {
          const taskData: MockData = {
            Name: task['Name'],
            Description: task['Description'],
            Rating: 0,
            Downloads: 0,
            YAML: task['YAML'],
          };
          return <Task key={task['Name']} task={taskData} />;
        })
      }
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    TaskData: state.TaskData.TaskData,

  };
};
export default connect(mapStateToProps, {fetchTaskSuccess})(TaskContainer);


