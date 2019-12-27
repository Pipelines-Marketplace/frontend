import React from 'react';
import {connect} from 'react-redux';
import {Gallery} from '@patternfly/react-core';
import Task from '../task/Task';
import {fetchTaskSuccess} from '../redux/Actions/TaskAction';
import {fetchTaskName} from '../redux/Actions/TaskActionName';
import './index.css';

export interface TaskPropData{
  name : string,
  description : string,
  rating : number,
  downloads : number,
  yaml : string,
  tags : [],
}

const TaskContainer: React.FC = (props: any) => {
  let tempArr : any = [];
  React.useEffect(() => {
    props.fetchTaskSuccess();
  // eslint-disable-next-line
  }, []);

  if (props.TaskName != null) {
    // tempArr = props.TaskName;
    for (let i = 0; i < props.TaskData.length; i++) {
      if (props.TaskName['id'] === props.TaskData[i]['id']) {
        tempArr.push(props.TaskData[i]);
      }
    }
  } else {
    if (props.TaskData != null) {
      tempArr = props.TaskData;
    }
  }


  return (
    <div className="block">
      <Gallery gutter="lg">
        {
          tempArr.map((task: any) => <Task key={task.id} task={task} />)
        }
      </Gallery>
    </div>
  );
};


const mapStateToProps = (state: any) => ({
  TaskData: state.TaskData.TaskData,
  TaskName: state.TaskName.TaskName,

});
export default
connect(mapStateToProps, {fetchTaskSuccess, fetchTaskName})(TaskContainer);
