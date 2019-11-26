import React from 'react';
import './image.css';
import {
  TextContent,
  Text, PageSection, PageSectionVariants,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import background from '../assets/logo/background.jpg';

const BackgroundImageHeader: React.FC = () => (
  <div className="background-image">
    <h1 className="heading">Welcome to Pipelines Marketplace</h1>
    <h3 className="tag-line">Discover, search and share reusable Tasks and Pipelines</h3>
  </div>
);
export default BackgroundImageHeader;
