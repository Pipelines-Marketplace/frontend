import React from 'react';
import Description from '../description/Description';
import Rating from '../rating/Rating';
import {
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import {useParams} from 'react-router';

const Detail: React.FC = () => {
  const {taskId} = useParams();
  return (
    <div>
      <Flex breakpointMods={[{modifier: 'row', breakpoint: 'lg'}, {modifier: 'nowrap', breakpoint: 'lg'}, {modifier: 'column', breakpoint: 'sm'}]}>
        <FlexItem>
          <Description id={taskId} />
        </FlexItem>
        <FlexItem>
          <Rating />
        </FlexItem>
      </Flex>
    </div>
  );
};

export default Detail;
