/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {
  Link,
} from 'react-router-dom';
import './index.css';
import {
  Card,
  Flex,
  FlexItem,
  Badge,
} from '@patternfly/react-core';
import { OkIcon, DownloadIcon } from '@patternfly/react-icons';
import SearchBar from '../search-bar/SearchBar'

export interface TaskPropObject {
  // id: number
  // name: string;
  // tags: string[];
  // description: string;
  // downloads: number;
  // rating: number;

  Name : string;
  Description : string;
  Rating : number;
  Downloads : number;
  YAML : string
}

export interface TaskProp {
  task: TaskPropObject
}
const Task: React.FC<TaskProp> = (props) => {
  return (
    <Card style={{maxWidth: '70%'}} className="card">
      <Flex breakpointMods={[{modifier: 'column', breakpoint: 'lg'}, {modifier: 'row', breakpoint: 'lg'}]}>
        <Flex breakpointMods={[{modifier: 'flex-1', breakpoint: 'lg'}]}>
          <div className="task-data">
            <FlexItem><Link to={`/detail/${props.task.Name}`}><span className="task-heading">{props.task.Name}</span></Link></FlexItem>
            {/* <FlexItem>{props.task.description.split('.')[0]}</FlexItem> */}
            <FlexItem>
              <React.Fragment>
                {/* {
                  props.task.tags.map((tag) =>
                    <span key={tag}>
                      <Badge>{tag}</Badge>
                      {' '}
                    </span>,
                  )
                } */}
              </React.Fragment>
            </FlexItem>
          </div>
        </Flex>
        <Flex>
          <FlexItem><span className="task-numbers"><DownloadIcon />{' '}5M</span></FlexItem>
          <FlexItem><span className="version"><OkIcon color='green' />{' '}4.5</span></FlexItem>
          {/* <FlexItem><span className="version">Version</span></FlexItem> */}
        </Flex>
      </Flex>
    </Card>
  );
};

export default Task;


