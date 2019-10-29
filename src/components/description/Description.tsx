/* eslint-disable max-len */
import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {
  Tabs,
  Tab,
  Card,
  CardHead,
  Text,
  TextContent,
  TextVariants,
  List,
  ListItem,
} from '@patternfly/react-core';
import {InfoCircleIcon, GithubIcon} from '@patternfly/react-icons';
import {mockData} from '../../services/mockdata';
import './index.css';
interface DescriptionProp {
  id: any
}

const Description: React.FC<DescriptionProp> = (taskId) => {
  const task = mockData.filter((task) => task.id == taskId.id)[0];
  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const handleTabClick = (event: any, tabIndex: any) => {
    setActiveTabKey(tabIndex);
  };
  return (
    <Card style={{minHeight: '40em', minWidth: '70em', maxWidth: '70em'}}>
      <CardHead>
        <div className="ok-icon"><InfoCircleIcon color='blue' size='sm' /></div>
        <div className="description-heading">
          Description {' '}
          <a href={task.Github} style={{textDecoration: 'none'}}>
            <GithubIcon color="black" size="md" />
          </a>
        </div>
      </CardHead>
      <Tabs isFilled activeKey={activeTabKey} onSelect={handleTabClick}>
        <Tab eventKey={0} title="Description">
          <div className="tabContent">
            <TextContent>
              <Text component={TextVariants.h1}>{task.Name}</Text>
              <Text component={TextVariants.h5}>{task.Description}</Text>

              <Text component={TextVariants.h1}>Install the tasks</Text>

              <List>
                <ListItem>kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/master/golang/lint.yaml</ListItem>
                <ListItem>kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/master/golang/build.yaml</ListItem>
                <ListItem>kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/master/golang/tests.yaml</ListItem>
              </List>

              <Text component={TextVariants.h1}>golangci-lint</Text>

              <Text component={TextVariants.h1}>Inputs</Text>

              <Text component={TextVariants.h2}>Parameters</Text>

              <List>
                <ListItem>
                  package: base package under test
                </ListItem>
                <ListItem>
                  packages: packages to test (default: ./...)
                </ListItem>
                <ListItem>
                  version: golang version to use for tests (default: 1.12)
                </ListItem>
                <ListItem>
                  flags: flags to use for go test command (default: -v)
                </ListItem>
                <ListItem>
                  GOOS: operating system target (default: linux)
                </ListItem>
                <ListItem>
                  GOARCH: architecture target (default: amd64)
                </ListItem>
                <ListItem>
                  GO111MODULE: value of module support (default: auto)
                </ListItem>
              </List>

              <Text component={TextVariants.h1}>Resources</Text>
              <List>
                <ListItem>
                  source: A git-type PipelineResource specifying the location of the source to build.
                </ListItem>
              </List>

              <Text component={TextVariants.h1}>golang-test</Text>
              <Text component={TextVariants.h1}>Inputs</Text>
              <Text component={TextVariants.h2}>Parameters</Text>

              <List>
                <ListItem>
                  package: base package to build in
                </ListItem>
                <ListItem>
                  packages: packages to test (default: ./cmd/...)
                </ListItem>
                <ListItem>
                  version: golang version to use for builds (default: 1.12)
                </ListItem>
                <ListItem>
                  flags: flags to use for go test command (default: -race -cover -v)
                </ListItem>
                <ListItem>
                  GOOS: operating system target (default: linux)
                </ListItem>
                <ListItem>
                  GOARCH: architecture target (default: amd64)
                </ListItem>
                <ListItem>
                  GO111MODULE: value of module support (default: auto)
                </ListItem>
              </List>

            </TextContent>
          </div>
        </Tab>
        <Tab eventKey={1} title="YAML">
          <pre className="yml prettyprint lang-yaml">
            apiVersion: tekton.dev/v1alpha1
            <br />
            kind: Task
            <br />
            metadata:
            <br />
            {'  '}name: kaniko
            <br />
            spec:
            <br />
            {'  '}inputs:
            <br />
            {'  '}params:
            <br />
            {'  '}- name: DOCKERFILE
            <br />
            {'   '}description: Path to the Dockerfile to build.
            <br />
            {'   '}default: ./Dockerfile
            <br />
            {'  '}- name: CONTEXT
            <br />
            {'   '} description: The build context used by Kaniko.
            <br />
            {'   '}default: ./
            <br />
            {'  '}- name: EXTRA_ARGS
            <br />
            {'   '}default: `&apos`
            <br />
            {'  '}resources:
            <br />
            {'   '}- name: source
            <br />
            {'     '}type: git
            <br />

            {'  '}outputs:
            <br />
            {'   '}resources:
            <br />
            {'    '}- name: image
            <br />
            {'      '}type: image
            <br />

            {'   '}steps:
            <br />
            {'    '}- name: build-and-push
            <br />
            {'      '}workingdir: /workspace/source
            <br />
            {'      '}image: gcr.io/kaniko-project/executor:v0.13.0
            <br />
            {'      '}# specifying DOCKER_CONFIG is required to allow kaniko to detect docker credential
            <br />
            {'      '}# https://github.com/tektoncd/pipeline/pull/706
          </pre>
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
        {/* <Tab eventKey={0} title="Description">
                    {task.Description}
                </Tab>
                <Tab eventKey={1} title="YAML">
                    {task.YAML}
                </Tab>
                <Tab eventKey={2} title="Example">
                    {task.YAML}
                </Tab>*/}
      </Tabs>
    </Card >
  );
};

export default Description;
