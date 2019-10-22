import React from "react"
import '@patternfly/react-core/dist/styles/base.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import "./index.css";
import {
    Card,
    Flex,
    FlexItem,
    Badge,
    PageSection,
} from '@patternfly/react-core';
import { OkIcon, DownloadIcon } from '@patternfly/react-icons';

const Task: React.FC = () => {
    return (
        <Card className="card">
            <Flex breakpointMods={[{ modifier: "column", breakpoint: "lg" }, { modifier: "row", breakpoint: "lg" }]}>
                <Flex breakpointMods={[{ modifier: "flex-1", breakpoint: "lg" }]}>
                    <div className="task-data">
                        <FlexItem><Link to="/detail"><span className="task-heading">Golang-build-task</span></Link></FlexItem>
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
                    <FlexItem><span className="task-numbers"><DownloadIcon />{' '}5M</span></FlexItem>
                    <FlexItem><span className="version"><OkIcon color='green' />{' '}4.5</span></FlexItem>
                    {/* <FlexItem><span className="version">Version</span></FlexItem> */}
                </Flex>
            </Flex>
        </Card>
    );
}

export default Task;


