import React from "react";
import Description from "../description/Description";
import Rating from "../rating/Rating";
import {
    Flex,
    FlexItem,
    TextContent,
    Text, PageSection, PageSectionVariants
} from '@patternfly/react-core';
import { HomeIcon, SearchIcon, UsersIcon, BellIcon, CogIcon } from '@patternfly/react-icons';

const Detail: React.FC = () => {
    return (
        <PageSection variant={PageSectionVariants.light}>
            <TextContent>
                <Text component="h1"><SearchIcon />{'  '}Search</Text>
            </TextContent>
        </PageSection>
    );
}

export default Detail;