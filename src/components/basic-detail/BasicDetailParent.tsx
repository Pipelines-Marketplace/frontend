import React from 'react';
import {
} from '@patternfly/react-core';
import {useParams} from 'react-router';
import BasicDetail from './BasicDetail';
import {connect} from 'react-redux';
import {fetchTaskName} from '../redux/Actions/TaskActionName';

const Detail: React.FC = (props: any) => {
  const {id} = useParams();
  React.useEffect(() => {
    props.fetchTaskName(id);
    // eslint-disable-next-line
  }, []);

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
