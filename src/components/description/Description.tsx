/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptate consequuntur autem harum quasi, natus sequi temporibus perferendis eos! Assumenda id nulla ratione quidem libero officiis asperiores aut veritatis odio.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi omnis, sint est quaerat architecto, amet ducimus, aliquid suscipit fuga itaque enim nostrum. Voluptatem, maxime magnam. Molestiae fugit facere nam expedita.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem deleniti facere iure inventore ex odio, necessitatibus omnis veritatis accusantium cumque odit voluptatum voluptate corrupti saepe quis rem consequuntur, ullam autem.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga sapiente vitae ipsa? Rem nobis, quae eligendi consequatur eos impedit. Incidunt, in aliquam. Repellendus minima aliquam voluptate culpa quis in voluptatem.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A inventore architecto voluptate atque voluptatibus ad cupiditate placeat exercitationem tempora dolor corrupti iure reprehenderit totam necessitatibus, ab, repellendus aut nisi eaque.
          </div>
        </Tab>
      </Tabs>
    </Card>
  );
};

export default Description;
