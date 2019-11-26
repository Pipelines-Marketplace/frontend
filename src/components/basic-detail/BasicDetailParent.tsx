import React from 'react';
import {
} from '@patternfly/react-core';
import {useParams} from 'react-router';
import {connect} from 'react-redux';
import BasicDetail from './BasicDetail';
import {fetchTaskName} from '../redux/Actions/TaskActionName';

const Detail: React.FC = (props: any) => {
  const {taskId} = useParams();
  console.log(taskId);

  React.useEffect(() => {
    props.fetchTaskName(taskId);
    // eslint-disable-next-line
  }, []);

  if (props.TaskName != null) {
    return (
      <BasicDetail task={props.TaskName} />
    );
  }

  return (
    <div />

  );
};

const mapStateToProps = (state: any) => ({
  TaskName: state.TaskName.TaskName,
});

export default connect(mapStateToProps, {fetchTaskName})(Detail);

// export default Detail;
