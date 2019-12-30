import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Grid,
  GridItem,
} from '@patternfly/react-core';
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
    <Card style={{marginLeft: '9em', marginRight: '3em', width: '90em'}}>

      <CardBody>
        <Grid style={{width: '100%'}}>
          <GridItem span={12}>
            <Tabs activeKey={activeTabKey} isSecondary
              onSelect={handleTabClick} style = {{boxShadow: 'none'}}>

              <Tab eventKey={0} title="Description"
                style = {{backgroundColor: 'white'}}>
                <hr
                  style = {{backgroundColor: '#EDEDED', marginBottom: '1em'}}>
                </hr>
                <ReactMarkDown source={markDown}
                  escapeHtml={true}
                  renderers={{code: CodeBlockReadme}}
                />
              </Tab>

              <Tab eventKey={1} title="YAML"
                style = {{backgroundColor: 'white'}}>
                <hr
                  style = {{backgroundColor: '#EDEDED', marginBottom: '1em'}}>
                </hr>
                <ReactMarkDown source={props.Yaml}
                  escapeHtml={true}
                  renderers={{code: CodeBlock}}
                />
              </Tab>

            </Tabs>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Description;
