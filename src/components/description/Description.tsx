import React from "react"
import '@patternfly/react-core/dist/styles/base.css';
import { Tabs, Tab, Card, CardHead } from '@patternfly/react-core';
import { InfoCircleIcon } from '@patternfly/react-icons';
import { mockData } from "../../services/mockdata";

interface DescriptionProp {
    id: any
}

const Description: React.FC<DescriptionProp> = (taskId) => {
    const task = mockData.filter((task) => task.id == taskId.id)[0];
    const [activeTabKey, setActiveTabKey] = React.useState(0);
    const handleTabClick = (event: any, tabIndex: any) => {
        setActiveTabKey(tabIndex);
    }
    return (
        <Card style={{ minHeight: '40em', minWidth: '70em', maxWidth: '70em' }}>
            <CardHead>
                <div className="ok-icon"><InfoCircleIcon color='blue' size='sm' /></div>
                <div className="rating-heading">Description</div>
            </CardHead>
            <Tabs isFilled activeKey={activeTabKey} onSelect={handleTabClick}>
                <Tab eventKey={0} title="Description">
                    {task.Description}
                </Tab>
                <Tab eventKey={1} title="YAML">
<pre className="prettyprint lang-yaml">
    apiVersion: tekton.dev/v1alpha1
<br/>
    kind: Task
<br/>
metadata:
<br/>
  {'  '}name: kaniko
<br/>
spec:
<br/>
 {'  '}inputs:
    <br/>
    {'  '}params:
    <br/>
    {'  '}- name: DOCKERFILE
    <br/>
    {'   '}description: Path to the Dockerfile to build.
        <br/>
        {'   '}default: ./Dockerfile
        <br/>
        {'  '}- name: CONTEXT
    <br/>
    {'   '} description: The build context used by Kaniko.
        <br/>
        {'   '}default: ./
        <br/>
        {'  '}- name: EXTRA_ARGS
    <br/>
    {'   '}default: ""
        <br/>
        {'  '}resources:
    <br/>
    {'   '}- name: source
    <br/>
    {'     '}type: git
        <br/>

        {'  '}outputs:
    <br/>
    {'   '}resources:
    <br/>
    {'    '}- name: image
    <br/>
    {'      '}type: image
        <br/>

        {'   '}steps:
    <br/>
    {'    '}- name: build-and-push
    <br/>
    {'      '}workingdir: /workspace/source
    <br/>
    {'      '}image: gcr.io/kaniko-project/executor:v0.13.0
    <br/>
    {'      '}# specifying DOCKER_CONFIG is required to allow kaniko to detect docker credential
    <br/>
    {'      '}# https://github.com/tektoncd/pipeline/pull/706 
</pre> 
                </Tab>
                <Tab eventKey={2} title="Example">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptate consequuntur autem harum quasi, natus sequi temporibus perferendis eos! Assumenda id nulla ratione quidem libero officiis asperiores aut veritatis odio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi omnis, sint est quaerat architecto, amet ducimus, aliquid suscipit fuga itaque enim nostrum. Voluptatem, maxime magnam. Molestiae fugit facere nam expedita.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem deleniti facere iure inventore ex odio, necessitatibus omnis veritatis accusantium cumque odit voluptatum voluptate corrupti saepe quis rem consequuntur, ullam autem.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga sapiente vitae ipsa? Rem nobis, quae eligendi consequatur eos impedit. Incidunt, in aliquam. Repellendus minima aliquam voluptate culpa quis in voluptatem.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A inventore architecto voluptate atque voluptatibus ad cupiditate placeat exercitationem tempora dolor corrupti iure reprehenderit totam necessitatibus, ab, repellendus aut nisi eaque.
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
        </Card>
    );
}

export default Description;