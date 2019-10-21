import React from "react"
import '@patternfly/react-core/dist/styles/base.css';
import "./index.css";
import {
    Card,
    Flex,
    FlexItem,
    Badge,
} from '@patternfly/react-core';
import { TimesIcon, PlusCircleIcon } from '@patternfly/react-icons';

const Task: React.FC = () => {
    return (
        <Card className="card">
            <Flex breakpointMods={[{ modifier: "column", breakpoint: "lg" }, { modifier: "row", breakpoint: "lg" }]}>
                <Flex breakpointMods={[{ modifier: "flex-1", breakpoint: "lg" }]}>
                    <div className="task-data">
                        <FlexItem><span className="task-heading">Golang-build-task</span></FlexItem>
                        <FlexItem>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est animi modi temporibus, alias qui obcaecati ullam dolor nam, nulla magni.</FlexItem>
                        <FlexItem>
                            <React.Fragment>
                                <Badge>Go</Badge>
                                {' '}
                                <Badge>task</Badge>
                                {' '}
                                <Badge>build</Badge>
                                {' '}
                                <Badge>git</Badge>
                            </React.Fragment>
                        </FlexItem>
                    </div>
                </Flex>
                <Flex>
                    {/* <div className="flex-numbers"> */}
                    <FlexItem><span className="task-numbers">Downloads</span></FlexItem>
                    <FlexItem>Rating</FlexItem>
                    <FlexItem><span className="version">Version</span></FlexItem>
                    {/* </div> */}
                </Flex>
            </Flex>
        </Card>
    );
}

export default Task;


