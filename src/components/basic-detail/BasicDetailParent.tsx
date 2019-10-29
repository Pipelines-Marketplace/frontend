import React from 'react';
import {
} from '@patternfly/react-core';
import {useParams} from 'react-router';
import BasicDetail from './BasicDetail';

const Detail: React.FC = () => {
  const {taskId} = useParams();
  return (
    <div>
      <BasicDetail id={taskId}/>
    </div>
  );
};

export default Detail;
