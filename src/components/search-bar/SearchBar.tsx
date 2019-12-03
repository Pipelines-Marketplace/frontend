/* eslint-disable max-len */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {SearchIcon, FilterIcon} from '@patternfly/react-icons';
import '@patternfly/react-core/dist/styles/base.css';
import './index.css';
import {
  Button,
  ButtonVariant,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Flex,
} from '@patternfly/react-core';
import {fetchTaskSuccess} from '../redux/Actions/TaskAction';
import SearchTask from './SearchTask';
import store from '../redux/store';

export interface TaskPropData{
  name : string,
  description : string,
  rating : number,
  downloads : number,
  yaml : string,
  tags : [],
}

const SearchBar: React.FC = (props:any) => {
  let tempArr: any = [];
  const tempTask : any = [];
  React.useEffect(() => {
    props.fetchTaskSuccess();
    // eslint-disable-next-line
  }, []);

  // Getting all data from store
  if (props.TaskData != null) {
    tempArr = props.TaskData.map((task: any) => {
      const taskData: TaskPropData = {
        name: task.name,
        description: task.description,
        rating: task.rating,
        downloads: task.downloads,
        yaml: task.yaml,
        tags: task.tags,
      };
      return taskData;
    });
  }

  // Dropdown menu
  const [isOpen, set] = useState(false);
  const dropdownItems = [
    <DropdownItem key="link" onClick = {sortByName}>Name</DropdownItem>,
    <DropdownItem key="link" onClick = {sortByDownloads}>Downloads</DropdownItem>,
    <DropdownItem key="link" onClick = {sortByRatings}>Ratings</DropdownItem>,
    <DropdownItem key="link" onClick = {sortByDownloads}>Favourites</DropdownItem>,
  ];
  const ontoggle = (isOpen: React.SetStateAction<boolean>) => set(isOpen);
  const onSelect = () => set(!isOpen);

  // eslint-disable-next-line require-jsdoc
  function sortByName() {
    const taskarr = tempArr.sort((first:any, second: any) => {
      if (first.name > second.name) {
        return 1;
      } else {
        return -1;
      }
    });
    store.dispatch({type: 'FETCH_TASK_SUCCESS', payload: taskarr});
  }

  // eslint-disable-next-line require-jsdoc
  function sortByDownloads() {
    const taskarr = tempArr.sort((first:any, second: any) => {
      if (first.downloads < second.downloads) {
        return 1;
      } else {
        return -1;
      }
    });
    store.dispatch({type: 'FETCH_TASK_SUCCESS', payload: taskarr});
  }

  // eslint-disable-next-line require-jsdoc
  function sortByRatings() {
    const taskarr = tempArr.sort((first:any, second: any) => {
      if (first.ratings < second.ratings) {
        return 1;
      } else {
        return -1;
      }
    });
    store.dispatch({type: 'FETCH_TASK_SUCCESS', payload: taskarr});
  }

  // Searching a task
  let [tasks, setTasks] = useState(''); // Get the user input

  const searchTask = (text : string) => {
    const task = {
      text,
    };
    tasks = task.text; // user input
    setTasks(tasks);

    if (props.TaskData != null) {
      for (let i = 0; i < tempArr.length; i++) {
        const regex = new RegExp(tempArr[i].name, 'gi');
        const data = tasks.toLowerCase().match(regex);
        if (data != null) {
          tempTask.push(tempArr[i]);
        }
      }
    }

    if (tempTask.length > 0) {
      store.dispatch({type: 'FETCH_TASK_SUCCESS', payload: tempTask});
    }
  };

  return (

    <div className="search">
      <Flex breakpointMods={[{modifier: 'flex-1', breakpoint: 'lg'}]}>
        <React.Fragment>
          <InputGroup style={{width: '70%'}}>
            {/* <TextInput name="textInput11" id="textInput11" type="search" aria-label="search input example"> */}
            <SearchTask onSearchTask={searchTask}/>
            {/* </TextInput> */}
            <Button variant={ButtonVariant.control} aria-label="search button for search input" >
              <SearchIcon />
            </Button>
          </InputGroup>

          <div className="filter">
            <Button variant={ButtonVariant.control} aria-label="search button for search input" >
              <FilterIcon />
            </Button>
            <Dropdown
              onSelect = {onSelect}
              toggle={<DropdownToggle onToggle={ontoggle}>Sort</DropdownToggle>}
              isOpen = {isOpen}
              dropdownItems={dropdownItems}
            />
          </div>
        </React.Fragment>
      </Flex>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TaskData: state.TaskData.TaskData,
});

export default connect(mapStateToProps, {fetchTaskSuccess})(SearchBar);

// export default SearchBar;
