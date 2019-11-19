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
  Badge,
  GalleryItem,
  TextContent,
} from '@patternfly/react-core';
import {OkIcon, DownloadIcon} from '@patternfly/react-icons';
import {CardHead, CardHeader, CardFooter, CardBody, CardActions} from '@patternfly/react-core';
import imgAvatar from '../assets/logo/imgAvatar.png';
export interface TaskPropObject {
  Name : string;
  Description : string;
  Rating : number;
  Downloads : number;
  YAML : string
}

export interface TaskProp {
  task: TaskPropObject
}
// eslint-disable-next-line
const Task: React.FC<TaskProp> = (props) => {
  return (
    <GalleryItem>
      <Card className="card" isHoverable>
        <CardHead>
          <div>
            <img src = {imgAvatar} alt="Task" style={{height: '50px'}}/>
          </div>
          <CardActions className="cardActions">
            <DownloadIcon className="download"/>
            <TextContent className="text">10M</TextContent>
            <OkIcon className="rating"/>
            <TextContent>4.5</TextContent>
          </CardActions>
        </CardHead>
        <CardHeader className="catalog-tile-pf-header">
          <Link to={`/detail/${props.task.Name}`}><span className="task-heading">{props.task.Name}</span></Link>
        </CardHeader>
        <CardBody className="catalog-tile-pf-body">
          <div className="catalog-tile-pf-description">
            <span>
              Ansible Tower (formerly ‘AWX’) is a web-based solution that makes Ansible even more easy to use for IT teams of all kinds,
              {/* <ReactMarkDown source={props.task.Description.substring(0, 100)} /> */}
            </span>
          </div>
        </CardBody>
        <CardFooter className="catalog-tile-pf-footer">
          <Badge className="badge">Build</Badge>
          {' '}
          <Badge className="badge">Task</Badge>
          {' '}
          <Badge className="badge">Deploy</Badge>
          {' '}

        </CardFooter>
      </Card>
    </GalleryItem>
  );
};
export default Task;
