import React from 'react';
import "./index.css";
import SearchBar from "../search-bar/SearchBar";
import TaskContainer from "../task-container/TaskContainer";
import '@patternfly/react-core/dist/styles/base.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Page, PageHeader, PageSidebar, PageSection } from '@patternfly/react-core';
import Detail from '../detail/Detail';

interface mainProps {

}
interface mainState {
  value: string;
}

const App: React.FC<mainProps> = (props) => {

  const [isNavOpen, setNavToggle] = React.useState(true);
  const onNavToggle = () => {
    setNavToggle(!isNavOpen);
  }
  const logoProps = {
    href: 'https://patternfly.org',
    onClick: () => console.log('clicked logo'),
    target: '_blank'
  };
  const Header = (
    <PageHeader
      logo="Logo"
      logoProps={logoProps}
      toolbar="Toolbar"
      avatar=" | Avatar"
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={onNavToggle}
    />
  );
  const Sidebar = <PageSidebar nav="Navigation" isNavOpen={isNavOpen} theme="dark" />;
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
