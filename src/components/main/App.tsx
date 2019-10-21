import React from 'react';
import "./index.css";
import Navbar from "../navbar/Navbar";
import Filter from "../filter/Filter";
import SearchBar from "../search-bar/SearchBar";
import TaskContainer from "../task-container/TaskContainer";
import Footer from "../footer/Footer";
import '@patternfly/react-core/dist/styles/base.css';
import { Page, PageHeader, PageSidebar, PageSection, PageSectionVariants } from '@patternfly/react-core';

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
    <React.Fragment>
      <Page header={Header} sidebar={Sidebar}>
        <PageSection>
          <TaskContainer />
        </PageSection>
      </Page>
    </React.Fragment>
  );
}

export default App;
