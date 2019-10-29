import React from 'react';
import {
  TextContent,
  Text, PageSection, PageSectionVariants,
} from '@patternfly/react-core';
import {SearchIcon} from '@patternfly/react-icons';

const Detail: React.FC = () => {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component="h1"><SearchIcon />{'  '}Search</Text>
      </TextContent>
    </PageSection>
  );
};

export default Detail;
