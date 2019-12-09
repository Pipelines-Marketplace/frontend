import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {
  Tabs,
  Tab,
  Card,
  CardHead,
  CardBody,
  Grid,
  GridItem,
  Text,
  TextContent,
} from '@patternfly/react-core';
import {InfoCircleIcon} from '@patternfly/react-icons';
import './index.css';
import ReactMarkDown from 'react-markdown';
import CodeBlock from './CodeBlock';
import CodeBlockReadme from './CodeBlockReadme';

export interface DescriptionProp {
  // id: any
  Description: string,
  Yaml: string,
  userTaskDescription: string
}


const Description: React.FC<DescriptionProp> = (props: any) => {
  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const handleTabClick = (event: any, tabIndex: any) => {
    setActiveTabKey(tabIndex);
  };

  let markDown : string = '';
  if (props.Description != null) {
    if (props.Description.match('noreadme')) {
      markDown = props.userTaskDescription;
    } else {
      markDown = props.Description;
    }
  }

  return (
    <Card style={{marginLeft: '7em', marginRight: '3em', width: '71em'}}>
      <CardHead>
        <InfoCircleIcon color="blue" size="sm"
          style = {{marginRight: '0.5em', marginBottom: '0.2em'}}/>
        <TextContent>
          <Text style = {{fontWeight: 'bold'}} >Description</Text>
        </TextContent>
      </CardHead>
      <CardBody>
        <Grid style={{width: '100%'}}>
          <GridItem span={12}>
            <Tabs isFilled activeKey={activeTabKey} onSelect={handleTabClick}>
              <Tab eventKey={0} title="Description" style = {{marginBottom: '1em'}}>
                <ReactMarkDown source={markDown}
                  escapeHtml={true}
                  renderers={{code: CodeBlockReadme}}
                />
              </Tab>

              <Tab eventKey={1} title="YAML">
                <ReactMarkDown source={props.Yaml}
                  escapeHtml={true}
                  renderers={{code: CodeBlock}}
                />
              </Tab>

              <Tab eventKey={2} title="Resources">
                    To be continued .....
              </Tab>
            </Tabs>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Description;
