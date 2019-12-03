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
  TextInput,
  Card,
} from '@patternfly/react-core';
import {fetchTaskSuccess} from '../redux/Actions/TaskAction';
import store from '../redux/store';

export interface TaskPropData{
  id : number;
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
  if (props.TaskData != null) {
    tempArr = props.TaskData.map((task: any) => {
      const taskData: TaskPropData = {
        id: task.id,
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

  // Search a task
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

  const taskNameArr: any = [];
  if (props.TaskData != null) {
    for (let i = 0; i < tempArr.length; i++) {
      taskNameArr.push(tempArr[i].name);
    }
  }


  // AutoComplete text while searching a task
  const [suggestions, setState] = React.useState([]);
  const [text, setText] = React.useState('');

  const onTextChanged = (e: any) => {
    const value = e;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = taskNameArr.sort().filter((v:any) => regex.test(v));
    }
    setState(suggestions);
    setText(value);
  };

  // Suggesting a task name
  const suggestionSelected = (value: any) => {
    setText(value);
    setState([]);
    searchTask(value);
  };

  const textValue = text;
  return (

    <div className="search">
      <Flex breakpointMods={[{modifier: 'flex-1', breakpoint: 'lg'}]}>
        <React.Fragment>

          <InputGroup style={{width: '70%'}}>
            <div style = {{width: '100%', boxShadow: 'rgba'}}>
              <TextInput value = {textValue} type="search"
                onChange={onTextChanged}
                style = {{outline: 'none', boxSizing: 'border-box', padding: '10px 5px'}}/>

              <div>
                <ul
                  style = {{textAlign: 'left', backgroundColor: 'white', margin: 0, position: 'absolute', width: '55.5%'}}
                >
                  {suggestions.map((item: any, index: any) =>

                    <li
                      style = {{listStyle: 'none', textAlign: 'left', cursor: 'pointer', padding: '10px 7px',
                        border: '0.01em solid rgb(224,224,224)', borderTop: '0'}}
                      onClick = {() => suggestionSelected(item)} key = {index}>
                      {item}
                    </li>,

                  )}
                </ul>
              </div>

            </div>
          </InputGroup>
          <Card style = {{marginLeft: '-1em'}}>
            <Button variant={ButtonVariant.control} aria-label="search button for search input" >
              <SearchIcon />
            </Button>
          </Card>

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
        </React.Fragment>
      </Flex>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TaskData: state.TaskData.TaskData,
});

export default connect(mapStateToProps, {fetchTaskSuccess})(SearchBar);


