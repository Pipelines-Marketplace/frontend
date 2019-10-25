import React from 'react';
import "./index.css";
import SearchBar from "../search-bar/SearchBar";
import TaskContainer from "../task-container/TaskContainer";
import '@patternfly/react-core/dist/styles/base.css';
import logo from '../assets/logo/logo.png'
import imgAvatar from '../assets/logo/imgAvatar.png';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { css } from '@patternfly/react-styles';

import { HomeIcon, SearchIcon, UsersIcon, BellIcon, CogIcon, BlueprintIcon } from '@patternfly/react-icons';
import spacingStyles from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import Community from "../community/Community";
import SearchPage from "../searchPage/SearchPage";
import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';


import {
  Button, Flex,ButtonVariant,
  ToolbarItem, Page, Nav, NavItem, NavList, NavVariants, Brand, PageHeader, PageSidebar,
  PageSection, PageSectionVariants, Toolbar, ToolbarGroup, Avatar
} from '@patternfly/react-core';
import Detail from '../detail/Detail';
import BasicDetail from '../basic-detail/BasicDetail';

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
    href: '/',
    onClick: () => console.log('clicked logo'),
    target: ''

  };

  function onNavSelect(result: any) {
    setActiveItem(result.itemId);
  }
  // code for header contents
  const PageToolbar = (
    <div>
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
  const PageNav = (

    <Nav onSelect={onNavSelect} aria-label="Nav" theme="dark">
      <NavList variant={NavVariants.default}>
        <NavItem itemId={0} isActive={activeItem === 0}><Link to="/">
          <HomeIcon />{' '}<span className="navLink">Home</span>
        </Link></NavItem>
        <NavItem itemId={1} isActive={activeItem === 1}><Link to="/search">
          <SearchIcon /> {' '}<span className="navLink">Search</span>
          </Link></NavItem>
        <NavItem itemId={2} isActive={activeItem === 2} ><Link to="/community">
          <UsersIcon />{' '}<span className="navLink">Community</span>
          </Link></NavItem>
      </NavList>
    </Nav>
  );
  const Sidebar = <PageSidebar nav={PageNav} isNavOpen={isNavOpen} theme="dark" />;
  return (
    <Router>
      <React.Fragment>
        <Page header={Header} sidebar={Sidebar}>
          <PageSection >
            <Route exact path='/' component={SearchBar} />
            <Route exact path='/detail/:taskId' component={BasicDetail} />
            <Route exact path='/search' component={SearchBar} />
          </PageSection>
          <PageSection style={{ minHeight: "100vh" }}>
            <Route exact path='/' component={TaskContainer} />
            <Route exact path='/detail/:taskId' component={Detail} />
            <Route path='/search' component={TaskContainer} />
            <Route path='/community' component={Community} />
          </PageSection>
        </Page>
      </React.Fragment>
    </Router>
  );
}

export default App;
