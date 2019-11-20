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
  YAML : string;
  TAGS : [];
}

export interface TaskProp {
  task: TaskPropObject
}

// eslint-disable-next-line
const Task: React.FC<TaskProp> = (props) => {
  console.log(props.task.TAGS.values);
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
            <OkIcon style={{color: 'green'}}/>
            <TextContent className="text">4.5</TextContent>
          </CardActions>
        </CardHead>
        <CardHeader className="catalog-tile-pf-header">
          <Link to={`/detail/${props.task.Name}`}><span className="task-heading">{props.task.Name}</span></Link>
        </CardHeader>
        <CardBody className="catalog-tile-pf-body">
          <div className="catalog-tile-pf-description">
            <span>
              {props.task.Description.substring(0, 100) + '   ...'}
            </span>
          </div>
        </CardBody>
        <CardFooter className="catalog-tile-pf-footer">
          {
            props.task.TAGS.map((tag: any) =>{
              return (<Badge style={{marginLeft: '0.5em'}} key={tag.Name} className="badge">{tag}</Badge>);
            })
          }
        </CardFooter>
      </Card>
    </GalleryItem>
  );
};
export default Task;
