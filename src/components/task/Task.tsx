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
  CardHead,
  CardHeader,
  CardFooter,
  CardBody,
  CardActions} from '@patternfly/react-core';
import {OkIcon, DownloadIcon} from '@patternfly/react-icons';

import imgAvatar from '../assets/logo/imgAvatar.png';

export interface TaskPropObject {
  name : string;
  description : string;
  rating : number;
  downloads : number;
  yaml : string;
  tags : [];
}

export interface TaskProp {
  task: TaskPropObject
}

// eslint-disable-next-line
const Task: React.FC<TaskProp> = (props:any) => {
  const tempArr : any = [];

  if (props.task.tags != null) {
    tempArr.push(props.task.tags);
  } else {
    tempArr.push([]);
  }

  return (
    <GalleryItem>
      <Card className="card" isHoverable>
        <CardHead>
          <div>
            <img src ={imgAvatar} alt="Task" style={{height: '50px'}} />
          </div>
          <CardActions className="cardActions">
            <DownloadIcon className="download"/>
            <TextContent className="text">{props.task.downloads}</TextContent>
            <OkIcon style={{color: 'green'}}/>
            <TextContent className="text">{props.task.rating}</TextContent>
          </CardActions>
        </CardHead>
        <CardHeader className="catalog-tile-pf-header">
          <Link to={`/detail/${props.task.id}`}><span className="task-heading">{props.task.name}</span></Link>
        </CardHeader>
        <CardBody className="catalog-tile-pf-body">
          <div className="catalog-tile-pf-description">
            <span>
              {`${props.task.description.substring(0, 100) }   ...`}
            </span>
          </div>
        </CardBody>
        <CardFooter className="catalog-tile-pf-footer">
          {
            tempArr[0].map((tag: any) => (<Badge style={{marginLeft: '0.5em'}} key={tag.Name} className="badge">{tag}</Badge>))
          }
        </CardFooter>
      </Card>
    </GalleryItem>
  );
};
export default Task;
