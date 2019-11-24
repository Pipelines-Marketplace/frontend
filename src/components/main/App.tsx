/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import React from 'react';
import './index.css';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { css } from '@patternfly/react-styles';
import SearchBar from '../search-bar/SearchBar';
import TaskContainer from '../task-container/TaskContainer';
import '@patternfly/react-core/dist/styles/base.css';
import logo from '../assets/logo/main.png';
import imgAvatar from '../assets/logo/imgAvatar.png';
import {
  BellIcon,
} from '@patternfly/react-icons';
import Community from '../community/Community';
import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';
import PageHeading from '../page-heading/PageHeading';
import Filter from '../filter/Filter';
import {
  Button,
  ButtonVariant,
  ToolbarItem,
  Page,
  Brand,
  PageHeader,
  PageSection,
  Toolbar,
  ToolbarGroup,
  Avatar,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import Detail from '../detail/Detail';
import BasicDetailParent from '../basic-detail/BasicDetailParent';

interface mainProps {

}
interface mainState {
  value: string;
}


const App: React.FC<mainProps> = () => {
  const [isNavOpen, setNavToggle] = React.useState(true);

  const onNavToggle = () => {
    setNavToggle(!isNavOpen);
  };
  const logoProps = {
    href: '/',
    // eslint-disable-next-line no-console
    onClick: () => console.log('clicked logo'),
    target: '',

  };
  // code for header contents
  const PageToolbar = (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <Toolbar>
        <ToolbarGroup className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnLg)}>
          <ToolbarItem>
            <Link to="/uploadtask">
              <span>
                {' '}
     Upload_Task
                {' '}
              </span>
              {' '}
            </Link>
            <Button id="default-example-uid-01" aria-label="Notifications actions" variant={ButtonVariant.plain}>
              <BellIcon />
            </Button>
          </ToolbarItem>
          <ToolbarItem>

            <Link to="/signin">
              <span> Signin </span>
              {' '}
            </Link>
            {/* <Button id="default-example-uid-02" onClick={SignIn} aria-label="Settings actions" variant={ButtonVariant.plain}>
              SignIn
            </Button> */}

          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    </div>

  );

  const Header = (
    <PageHeader
      logo={<Brand src={logo} alt="Pipelines-Marketplace Logo" />}
      logoProps={logoProps}
      toolbar={PageToolbar}
      avatar={<Avatar src={imgAvatar} alt="user icon" />}
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={onNavToggle}

    />
  );
  //  code for navigation page
  // const Sidebar = <Filter />;
  return (
    <Router>
      <Page header={Header}>
        {/* <PageSection variant={PageSectionVariants.light}> */}
        <Route exact path="/" component={PageHeading} />
        <Route exact path="/search" component={PageHeading} />

        {/* </PageSection> */}
        <PageSection>
          <Route exact path="/" component={SearchBar} />
          {/* <Route exact path="/uploadtask" component={Uploadtask} /> */}
          <Route exact path="/detail/:taskId" component={BasicDetailParent} />
          <Route exact path="/search" component={SearchBar} />
        </PageSection>
        <PageSection>
          <Flex className="example-border" breakpointMods={[{ modifier: 'flex-1', breakpoint: 'lg' }]}>
            <FlexItem>
              <Route exact path="/" component={Filter} />
            </FlexItem>
            <FlexItem>
              <Route exact path="/" component={TaskContainer} />
              <Route path="/search" component={TaskContainer} />
            </FlexItem>
          </Flex>
          <Route exact path="/detail/:taskId" component={Detail} />
          <Route path="/community" component={Community} />
        </PageSection>
      </Page>
    </Router>
  );
};

export default App;
