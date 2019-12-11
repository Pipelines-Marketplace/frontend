import React from 'react';
import './index.css';
import {Flex, FlexItem, Avatar, Grid, GridItem, TextContent} from '@patternfly/react-core';
import tektonLogo from '../assets/logo/logo.png';
const Footer: React.FC = () => {
  return (
    <div>
      <span className="footer-link">
        <Flex className="example-border" breakpointMods={[{modifier:
          'justify-content-space-around', breakpoint: 'lg'}]}>
          <FlexItem>
            {/* <Flex>
              <Flex style={{margin: '0'}}>
                <FlexItem>
                  <img src={tektonLogo} alt="" style={{marginTop: '3em', height: '7em'}}/>
                </FlexItem>
              </Flex>
              <Flex breakpointMods={[{modifier:
          'column', breakpoint: 'lg'}, {modifier:
            'align-self-stretch', breakpoint: 'lg'}]}>
                <FlexItem style={{marginTop: '5em', marginLeft: '3em'}}>

                  <span className="links-heading">
                Tekton</span>
                </FlexItem>
                <FlexItem >
                  <p className="tekton-def" style={{wordBreak: 'break-all'}}>
            The Tekton Pipelines project provides k8s-style resources
            for declaring CI/CD-style pipelines.Click here to learn more about
                    <a href="https://github.com/tektoncd/pipeline">Tekton</a>
                  </p>
                </FlexItem>
              </Flex>
            </Flex> */}
            {/* <img src={tektonLogo} alt="" style={{marginTop: '3em', height: '7em'}}/> */}
          </FlexItem>
          <FlexItem>
            <span className="links-heading">Quick Links</span>
            <Flex breakpointMods={[{modifier:
          'column', breakpoint: 'lg'}]}>
              <FlexItem><a href="/" className="links">About</a> </FlexItem>
              <FlexItem><a href="/" className="links">Contribute</a></FlexItem>
              <FlexItem><a href="/" className="links">Tekton</a></FlexItem>
            </Flex>
          </FlexItem>
          <FlexItem>
            <span className="links-heading">Contribute</span>
            <Flex breakpointMods={[{modifier:
          'column', breakpoint: 'lg'}]}>
              <FlexItem><a href="/" className="links">About</a> </FlexItem>
              <FlexItem><a href="/" className="links">Contribute</a></FlexItem>
              <FlexItem><a href="/" className="links">Tekton</a></FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </span>
      <span className="copyrights">
        <h4 className="copyrights-text">
Copyright © 2019 Red Hat, Inc.</h4>
      </span>
    </div>

  );
};

export default Footer;
