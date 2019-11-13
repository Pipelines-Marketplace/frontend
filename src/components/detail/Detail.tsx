import React from 'react';
import Description from '../description/Description';
import Rating from '../rating/Rating';
import {connect} from 'react-redux';
import {
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import {useParams} from 'react-router';
import {fetchTaskDescription} from '../redux/Actions/TaskActionDescription';

const Detail: React.FC = (props: any) => {
  const {name} = useParams();
  React.useEffect(() => {
    props.fetchTaskDescription(name);
  });

  // console.log(fetchdata)
  // console.log(props.TaskDescription)
  return (
    <div>
      <Flex breakpointMods={[{modifier: 'row', breakpoint: 'lg'},
        {modifier: 'nowrap', breakpoint: 'lg'},
        {modifier: 'column', breakpoint: 'sm'}]}>
        <FlexItem>
          <Description
            Description = {props.TaskDescription}
            Yaml = {props.TaskYaml} />
        </FlexItem>
        <FlexItem>
          <Rating />
        </FlexItem>
      </Flex>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    TaskDescription: state.TaskDescription.TaskDescription,
    TaskYaml: state.TaskYaml.TaskYaml,
  };
};
export default connect(mapStateToProps, {fetchTaskDescription})(Detail);

// export default Detail;
