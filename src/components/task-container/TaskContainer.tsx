import React from 'react';
import {connect} from 'react-redux';
import Task from '../task/Task';
import {fetchTaskSuccess} from '../redux/Actions/TaskAction';
import {Gallery} from '@patternfly/react-core';
import './index.css';

export interface TaskPropData{
  Name : string,
  Description : string,
  Rating : number,
  Downloads : number,
  Yaml : string,
  Tags : [],
}

const TaskContainer: React.FC = (props: any) => {
  let tempArr : any = [];
  React.useEffect(() => {
    props.fetchTaskSuccess();
  }, []);

  if (props.TaskData != null) {
    tempArr = props.TaskData.map((task: any) =>{
      const taskData: TaskPropData = {
        Name: task['name'],
        Description: task['description'],
        Rating: 0,
        Downloads: 0,
        Yaml: task['yaml'],
        Tags: task['tags'],
      };
      return taskData;
    });
  }

  return (
    <div className="block">
      <Gallery gutter = "lg">
        {
          tempArr.map((task: any) => {
            return <Task key={task['name']} task = {task} />;
          })
        }
      </Gallery>
    </div>
  );
};


const mapStateToProps = (state: any) => {
  return {
    TaskData: state.TaskData.TaskData,
  };
};

export default connect(mapStateToProps, {fetchTaskSuccess})(TaskContainer);


