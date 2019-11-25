/* eslint-disable max-len */
import React from 'react';
import {

  Card,
  Flex,
  // Badge,
  FlexItem,
  Button,
} from '@patternfly/react-core';
import {DownloadIcon, StarIcon} from '@patternfly/react-icons';
import {
  Badge,
} from '@patternfly/react-core';
import './index.css';
import '@patternfly/react-core/dist/styles/base.css';
import {Avatar} from '@patternfly/react-core';
import avatarImg from './download.png';
import './index.css';

export interface BasicDetailPropObject {
    // id: any
    name : string;
    description : string;
    downloads : number;
    rating : number;
    yaml : string;
    tags : []
}

export interface BasicDetailProp {
  task: BasicDetailPropObject
}

const BasicDetail: React.FC<BasicDetailProp> = (props: any) => {
  const tempArr : any = [];

  if (props.task.tags != null) {
    tempArr.push(props.task.tags);
  } else {
    tempArr.push([]);
  }

  return (
    <Card>
      <Flex breakpointMods={[{modifier: 'align-items-center', breakpoint: 'lg'}]}>
        <div className="avatar">
          <Flex breakpointMods={[{modifier: 'align-self-flex-center', breakpoint: 'lg'}]}>
            <FlexItem><Avatar src={avatarImg} alt="avatar" style={{height: '5em', width: '5em'}}></Avatar></FlexItem>
          </Flex>
        </div>
        <Flex breakpointMods={[{modifier: 'flex-1', breakpoint: 'lg'}]}>
          <FlexItem>
            <div className="data">
              <Flex breakpointMods={[{modifier: 'column', breakpoint: 'lg'}]}>
                <FlexItem><span className="heading">{props.task.name}</span></FlexItem>
                <Flex breakpointMods={[{modifier: 'row', breakpoint: 'lg'}]}>
                  {
                    tempArr[0].map((tag: any) =>{
                      return (<Badge style={{paddingRight: '1em'}} key={tag.Name} className="badge">{tag}</Badge>);
                    })
                  }
                </Flex>
              </Flex>
            </div>
          </FlexItem>
        </Flex>

        <div className="download">
          <Flex breakpointMods={[{modifier: 'align-right', breakpoint: 'lg'}, {modifier: 'column', breakpoint: 'lg'}]}>
            <FlexItem><span className="downloadNumber"><DownloadIcon />
              {'  '}{props.task.downloads}</span></FlexItem>
            <FlexItem><span className="star"><StarIcon color="gold" size="md" /></span></FlexItem>
            <FlexItem><span className="downloadIcon">
              <Button className="button" style={{width: '9em'}}>
                 Download
              </Button></span></FlexItem>
          </Flex>
        </div>

      </Flex>
    </Card>
  );
};


export default BasicDetail;


