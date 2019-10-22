import React from 'react';
import "./index.css";
import SearchBar from "../search-bar/SearchBar";
import TaskContainer from "../task-container/TaskContainer";
import '@patternfly/react-core/dist/styles/base.css';
import logo from '../assets/logo/logo.png'
import imgAvatar from '../assets/logo/imgAvatar.png';
import {Link,BrowserRouter as Router,Route} from 'react-router-dom';

import { HomeIcon, SearchIcon, UsersIcon, BellIcon, CogIcon } from '@patternfly/react-icons';
import spacingStyles from '@patternfly/react-styles/css/utilities/Spacing/spacing';

import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';

import { css } from '@patternfly/react-styles';

import {
  Button, ButtonVariant,
  ToolbarItem, Page, Nav, NavItem, NavList, NavVariants, Brand, PageHeader, PageSidebar,
  PageSection, PageSectionVariants, Toolbar, ToolbarGroup, Avatar
} from '@patternfly/react-core';
import Detail from '../detail/Detail';

interface mainProps {

}
interface mainState {
  value: string;
}

const App: React.FC<mainProps> = (props) => {

  const [isNavOpen, setNavToggle] = React.useState(true);

  const [activeItem, setActiveItem] = React.useState(0);

  const onNavToggle = () => {
    setNavToggle(!isNavOpen);
  }


  const logoProps = {
    href: '',
    onClick: () => console.log('clicked logo'),
    target: '_blank'
  };

  function onNavSelect(result:any) {
    setActiveItem(result.itemId);

  }
  // code for header contents
  const PageToolbar = (
    <Toolbar>
      <ToolbarGroup className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnLg)}>
        <ToolbarItem>
          <Button id="default-example-uid-01" aria-label="Notifications actions" variant={ButtonVariant.plain}>
            <BellIcon />
          </Button>
        </ToolbarItem>
        <ToolbarItem>
          <Button id="default-example-uid-02" aria-label="Settings actions" variant={ButtonVariant.plain}>
            <CogIcon />
          </Button>
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>

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
  const PageNav = (
    <Nav onSelect={onNavSelect} aria-label="Nav" theme="dark">
      <NavList variant={NavVariants.simple}>
        <NavItem itemId={0} isActive={activeItem === 0}>
          <HomeIcon />{' '}Home
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === 1}>
          <SearchIcon /> {' '}Search
        </NavItem>
        <NavItem itemId={2} isActive={activeItem === 2} >
          <UsersIcon />{' '}Community
        </NavItem>
      </NavList>
    </Nav>
  );


  const Sidebar = <PageSidebar nav={PageNav} isNavOpen={isNavOpen} theme="dark" />;
  return (
    <Router>
    <React.Fragment>
      <Page header={Header} sidebar={Sidebar}>
        <PageSection>
          <Route exact path='/' component={SearchBar} />
        </PageSection>
        <PageSection>
          <Route exact path='/' component={TaskContainer} />
          <Route path='/detail' component={Detail} />
        </PageSection>
      </Page>
    </React.Fragment>
    </Router>
  );
}

export default App;
