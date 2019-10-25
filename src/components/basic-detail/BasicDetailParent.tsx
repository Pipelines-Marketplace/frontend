import React from "react";
import Description from "../description/Description";
import Rating from "../rating/Rating";
import {
    Flex,
    FlexItem,
} from '@patternfly/react-core';
import { useParams } from "react-router";
import BasicDetail from "./BasicDetail";

const Detail: React.FC = () => {
    let { taskId } = useParams();
    return (
        <div>
            <BasicDetail id={taskId}/>
        </div>
    );
}

export default Detail;