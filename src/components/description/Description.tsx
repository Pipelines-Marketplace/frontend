import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {
  Tabs,
  Tab,
  Card,
  CardHead,
  TextContent,
} from '@patternfly/react-core';
import {InfoCircleIcon} from '@patternfly/react-icons';
import './index.css';
import ReactMarkDown from 'react-markdown';
import CodeBlock from './CodeBlock';
import CodeBlockReadme from './CodeBlockReadme';
import {ClipboardCopy} from '@patternfly/react-core';

export interface DescriptionProp {
  // id: any
  Description: string,
  Yaml : string
}

const Description: React.FC<DescriptionProp> = (props:any) => {
  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const handleTabClick = (event: any, tabIndex: any) => {
    setActiveTabKey(tabIndex);
  };
  return (
    <Card style={{minHeight: '40em', minWidth: '70em', maxWidth: '70em'}}>
      <CardHead>
        <div className="ok-icon"><InfoCircleIcon color="blue" size="sm" /></div>
        <div className="description-heading">
          Description {' '}
        </div>
      </CardHead>
      <Tabs isFilled activeKey={activeTabKey} onSelect={handleTabClick}>
        {/* <Tabs> */}
        <Tab eventKey={0} title="Description">
          <div className="tabContent">
            <TextContent>
              <ReactMarkDown source = {props.Description}
                renderers={{code: CodeBlockReadme}}
              />

            </TextContent>
          </div>
        </Tab>
        <Tab eventKey={1} title="YAML">
          <ReactMarkDown source = {props.Yaml}
            renderers={{code: CodeBlock}}
          />
          <ClipboardCopy></ClipboardCopy>
        </Tab>
        <Tab eventKey={2} title="Resources">
          <div className="example">

          </div>
        </Tab>
      </Tabs>
    </Card>
  );
};

export default Description;
