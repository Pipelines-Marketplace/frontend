
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
import Community from '../community/Community';
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
import BackgroundImageHeader from '../background-image/BackgroundImage';
import Login from '../Authentication/Login';
import SignupForm from '../Authentication/Signup';


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
  const logoutUser=()=>{
    localStorage.removeItem('token');
    console.log('dasdas');
  };
  let authenticationButton;
  if (localStorage.getItem('token')===null) {
    authenticationButton= <Link to="/login">
      <span style={{marginRight: '1em', color: 'white'}}> Login </span>
    </Link>;
  } else {
    authenticationButton= <Link to="/logout">
      <span style={{marginRight: '1em', color: 'white'}}
        onClick={logoutUser}> Logout </span>
    </Link>;
  }


  // code for header contents
  const PageToolbar = (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem style={{color: 'white'}}>
            <Link to="/">
              <span style={{marginRight: '2em', color: 'white'}}>Home</span>
            </Link>

            <Link to="/">
              <span style={{marginRight: '2em', color: 'white'}}>Search</span>
            </Link>

            <Link to="/">
              <span style={{marginRight: '2em', color: 'white'}}>
                Community
              </span>
            </Link>

            <Link to="/upload">
              <span style={{marginRight: '0em', color: 'white'}}>
                {/* {' '} */}
              UploadTask
                {/* {' '} */}
              </span>
              {' '}
            </Link>
            <Button id="default-example-uid-01"
              aria-label="Notifications actions"
              variant={ButtonVariant.plain}>
            </Button>
          </ToolbarItem>
          <ToolbarItem>
            {
              authenticationButton
            }


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
          <Flex
            className="example-border"
            breakpointMods={[{modifier: 'flex-1', breakpoint: 'lg'}]}
          >
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
        <PageSection>
          <Route path='/login' component={Login}/>
          <Route path='/logout' component={Login}/>
          <Route path='/signup' component={SignupForm}/>
        </PageSection>
      </Page>
    </Router>
  );
};

export default App;
