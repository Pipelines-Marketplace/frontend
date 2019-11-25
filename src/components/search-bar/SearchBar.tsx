/* eslint-disable max-len */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SearchIcon, FilterIcon } from '@patternfly/react-icons';
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
import { fetchTaskSuccess } from '../redux/Actions/TaskAction';
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
  }, []);
  if (props.TaskData != null) {
    tempArr = props.TaskData.map((task: any) => {
      const taskData: TaskPropData = {
        name: task.name,
        description: task.description,
        rating: 0,
        downloads: 0,
        yaml: task.yaml,
        tags: task.tags,
      };
      return taskData;
    });
  }

  const [isOpen, set] = useState(false);
  const dropdownItems = [
    <DropdownItem key="link">Link</DropdownItem>,
    <DropdownItem key="action" component="button">
          Action
    </DropdownItem>,
    <DropdownItem key="disabled link" isDisabled>
          Disabled Link
    </DropdownItem>,

  ];
  const ontoggle = (isOpen: React.SetStateAction<boolean>) => set(isOpen);
  const onSelect = () => set(!isOpen);

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

    store.dispatch({ type: 'FETCH_TASK_SUCCESS', payload: tempTask });
  };

  return (

    <div className="search">
      <Flex breakpointMods={[{ modifier: 'flex-1', breakpoint: 'lg' }]}>
        <>
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
              toggle={<DropdownToggle onToggle={ontoggle}>Filter</DropdownToggle>}
              isOpen = {isOpen}
              dropdownItems={dropdownItems}
            />
          </div>

        </>
      </Flex>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
    TaskData: state.TaskData.TaskData,
  });

export default connect(mapStateToProps, { fetchTaskSuccess })(SearchBar);

// export default SearchBar;
