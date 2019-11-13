import React from 'react';
import {
} from '@patternfly/react-core';
import {useParams} from 'react-router';
import BasicDetail from './BasicDetail';
import {connect} from 'react-redux';
import {fetchTaskName} from '../redux/Actions/TaskActionName';

export interface MockData{
  Name : string,
  Description : string,
  Downloads : number,
  Rating : number,
  YAML : string
}

const Detail: React.FC = (props: any) => {
  const {name} = useParams();
  React.useEffect(() => {
    props.fetchTaskName(name);
  });
  let tempArr : any = [];

  if (props.TaskName != null) {
    Object.keys(props.TaskName).map(function(key) {
      tempArr.push({[key]: props.TaskName[key]});
      return tempArr;
    });
  }

  if (props.TaskData != null) {
    tempArr = props.TaskData.map((task: any) =>{
      const taskData: MockData = {
        Name: task['Name'],
        Description: task['Description'],
        Rating: 0,
        Downloads: 0,
        YAML: task['YAML'],
      };
      return taskData;
    });
  };

  if (props.TaskName!=null) {
    return (
      <BasicDetail task={props.TaskName} />
    );
  };

  return (
    <div>

    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    TaskName: state.TaskName.TaskName,
  };
};

export default connect(mapStateToProps, {fetchTaskName})(Detail);

// export default Detail;
