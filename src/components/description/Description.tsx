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
} from '@patternfly/react-core';
import {InfoCircleIcon} from '@patternfly/react-icons';
import './index.css';
import ReactMarkDown from 'react-markdown';
import CodeBlock from './CodeBlock';
import CodeBlockReadme from './CodeBlockReadme';

export interface DescriptionProp {
  // id: any
  Description: string,
  Yaml: string
}


const Description: React.FC<DescriptionProp> = (props: any) => {
  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const handleTabClick = (event: any, tabIndex: any) => {
    setActiveTabKey(tabIndex);
  };
  return (
    <Card style={{marginLeft: '7em', marginRight: '7em'}}>
      <CardHead>
        <InfoCircleIcon color="blue" size="sm" />
        {'  '}Description {' '}
      </CardHead>
      <CardBody>
        <Grid>
          <GridItem span={12}>
            <Tabs isFilled activeKey={activeTabKey} onSelect={handleTabClick}>
              <Tab eventKey={0} title="Description">
                <ReactMarkDown source={props.Description}
                  escapeHtml={true}
                  renderers={{code: CodeBlockReadme}}
                />
                {/* {props.Description} */}
              </Tab>

              <Tab eventKey={1} title="YAML">
                <ReactMarkDown source={props.Yaml}
                  escapeHtml={true}
                  renderers={{code: CodeBlock}}
                />
              </Tab>

              <Tab eventKey={2} title="Resources">
                    Yeh next sprint mein
              </Tab>
            </Tabs>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Description;
