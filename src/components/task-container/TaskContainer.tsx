import React from 'react';
import {connect} from 'react-redux';
import Task from '../task/Task';
import {fetchTaskSuccess} from '../redux/Actions/TaskAction';
import {Gallery} from '@patternfly/react-core';
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

  if (props.TaskData != null) {
    tempArr = props.TaskData;
  }
  return (
    <div className="block">
      <Gallery gutter = "lg">
        {
          tempArr.map((task: any) => {
            return <Task key={task['id']} task = {task} />;
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


