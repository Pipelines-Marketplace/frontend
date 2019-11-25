/* eslint-disable max-len */
import React from 'react';
import {Provider} from 'react-redux';
import store from '../redux/store';
import './index.css';
import SearchBar from '../search-bar/SearchBar';
import TaskContainer from '../task-container/TaskContainer';
import '@patternfly/react-core/dist/styles/base.css';
import logo from '../assets/logo/main.png';
import imgAvatar from '../assets/logo/imgAvatar.png';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';
import {css} from '@patternfly/react-styles';

import {HomeIcon, SearchIcon, UsersIcon, BellIcon, CogIcon, FileImageIcon} from '@patternfly/react-icons';
import Community from '../community/Community';
import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';
import PageHeading from '../page-heading/PageHeading';


import {
  Button,
  ButtonVariant,
  ToolbarItem,
  Page,
  Nav,
  NavItem,
  NavList,
  NavVariants,
  Brand,
  PageHeader,
  PageSidebar,
  PageSection,
  Toolbar,
  ToolbarGroup,
  Avatar,
} from '@patternfly/react-core';
import Detail from '../detail/Detail';
import BasicDetailParent from '../basic-detail/BasicDetailParent';

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
  };


  const logoProps = {
    href: '/',
    onClick: () => console.log('clicked logo'),
    target: '',

  };

  const onNavSelect=(result: any) =>{
    setActiveItem(result.itemId);
  };
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
        <NavItem itemId={3} isActive={activeItem === 3} ><Link to="/community">
          <FileImageIcon />{' '}<span className="navLink">My Content</span>
        </Link></NavItem>
      </NavList>
    </Nav>
  );
  const Sidebar = <PageSidebar nav={PageNav} isNavOpen={isNavOpen} theme="dark" />;
  return (
    <Router>
      <React.Fragment>
        <Page header={Header} sidebar={Sidebar}>
          {/* <PageSection variant={PageSectionVariants.light}> */}
          <Route exact path='/' component={PageHeading} />
          <Route exact path='/search' component={PageHeading} />
          {/* </PageSection> */}
          <PageSection>
            <Provider store = {store}>
              <Route exact path='/' component={SearchBar} />
              <Route exact path='/detail/:id' component={BasicDetailParent} />
              <Route exact path='/search' component={SearchBar} />
            </Provider>
          </PageSection>
          <PageSection style={{minHeight: '100vh'}}>
            {/* <Provider store = {store}> */}
            <Route exact path='/' component={TaskContainer} />
            <Route exact path='/detail/:id' component={Detail} />
            <Route path='/search' component={TaskContainer} />
            <Route path='/community' component={Community} />
            {/* </Provider> */}
          </PageSection>
        </Page>
      </React.Fragment>
    </Router>
  );
};

export default App;
