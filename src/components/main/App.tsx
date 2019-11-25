/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import React from 'react';
import './index.css';
import {
  Link,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import SearchBar from '../search-bar/SearchBar';
import TaskContainer from '../task-container/TaskContainer';
import UploadTask from '../upload-task/UploadTask';
import '@patternfly/react-core/dist/styles/base.css';
import logo from '../assets/logo/main.png';
import imgAvatar from '../assets/logo/imgAvatar.png';
import {
  BellIcon, HomeIcon,
} from '@patternfly/react-icons';
import Community from '../community/Community';
import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';
import PageHeading from '../background-image/BackgroundImage';
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
  BackgroundImage,
} from '@patternfly/react-core';
import Detail from '../detail/Detail';
import BasicDetailParent from '../basic-detail/BasicDetailParent';
import SearchTask from '../search-bar/SearchTask';
import BackgroundImageHeader from '../background-image/BackgroundImage';


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
        <ToolbarGroup>
          <ToolbarItem style={{ color: 'white' }}>
            <Link to="/">
              <span style={{ marginRight: '2em', color: 'white' }}>Home</span>
            </Link>

            <Link to="/">
              <span style={{ marginRight: '2em', color: 'white' }}>Search</span>
            </Link>

            <Link to="/">
              <span style={{ marginRight: '2em', color: 'white' }}>Community</span>
            </Link>

            <Link to="/upload">
              <span style={{ marginRight: '0em', color: 'white' }}>
                {/* {' '} */}
              UploadTask
                {/* {' '} */}
              </span>
              {' '}
            </Link>
            <Button id="default-example-uid-01" aria-label="Notifications actions" variant={ButtonVariant.plain}>
              {/* <BellIcon /> */}
            </Button>
          </ToolbarItem>
          <ToolbarItem>

            <Link to="/signin">
              <span style={{ marginRight: '1em', color: 'white' }}> Signin </span>
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
  return (
    <Router>
      <Page header={Header}>
        {/* <PageSection variant={PageSectionVariants.light}> */}
        <Route exact path="/" component={BackgroundImageHeader} />
        <Route exact path="/search" component={BackgroundImageHeader} />

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
              <Route exact path="/upload" component={UploadTask} />
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
