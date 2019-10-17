import React from 'react';
import "./index.css";
import Navbar from "../navbar/Navbar";
import Filter from "../filter/Filter";
import SearchBar from "../search-bar/SearchBar";
import TaskContainer from "../task-container/TaskContainer";
import Footer from "../footer/Footer";

const App: React.FC = () => {
  return (
    <div className="main">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="filter">
        <Filter />
      </div>
      <div className="task-card-container">
        <TaskContainer />
      </div>
      <div className="footer">
        <Footer/>
      </div>
    </div>
  );
}

export default App;
