/* eslint-disable max-len */
import React, {useState} from 'react';
import {SearchIcon, FilterIcon} from '@patternfly/react-icons';
import '@patternfly/react-core/dist/styles/base.css';
import './index.css';
import {
  Button,
  ButtonVariant,
  InputGroup,
  TextInput,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  Flex,
} from '@patternfly/react-core';

const SearchBar: React.FC = (props) => {
  const [isOpen, set] = useState(false);
  const dropdownItems = [
    <DropdownItem key="link">Link</DropdownItem>,
    <DropdownItem key="action" component="button">
          Action
    </DropdownItem>,
    <DropdownItem key="disabled link" isDisabled>
          Disabled Link
    </DropdownItem>,
    <DropdownItem key="disabled action" isDisabled component="button">
          Disabled Action
    </DropdownItem>,
    <DropdownSeparator key="separator" />,
    <DropdownItem key="separated link">Separated Link</DropdownItem>,
    <DropdownItem key="separated action" component="button">
          Separated Action
    </DropdownItem>,
  ];
  const ontoggle = (isOpen: React.SetStateAction<boolean>) => set(isOpen);
  const onSelect = () => set(!isOpen);

  // let tasksName:any = []
  // const taskName = mockData.map((task, index) => {
  //   tasksName.push(task.Name)      //Get all the task names
  //   // return task.Name
  // })

  // var [tasks, setTasks] = useState('')      //Get the user input
  // const searchTask = (text : string) => {
  //     const task = {
  //       text
  //     }
  //     tasks = task.text;
  //     setTasks(tasks);
  //     // console.log(tasks);

  //     var _tasks = tasksName.filter((taskMatch:any) => {
  //       var regex = new RegExp(taskMatch, 'gi')
  //       var data = tasks.toLowerCase().match(regex);
  //       // console.log(data)

  //       // for(var i = 0; i < mockData.length; i++){
  //       //   if(String(data) == mockData[i].Name.toLocaleLowerCase()){
  //       //     //  console.log("Ayo")
  //       //     const taskdata : TaskPropObject = {
  //       //       id : mockData[i].id,
  //       //       name : mockData[i].Name,
  //       //       tags : mockData[i].Tags,
  //       //       description : mockData[i].Description,
  //       //       downloads : 0,
  //       //       rating : 0
  //       //     }
  //       //     // console.log(taskdata)
  //       //     return <Task task = {taskdata}/>
  //       //   }
  //       // }
  //   })
  // }

  return (

    <div>
      <Flex breakpointMods={[{modifier: 'flex-1', breakpoint: 'lg'}]}>
        <React.Fragment>
          <InputGroup style={{width: '70%'}}>
            <TextInput name="textInput11" id="textInput11" type="search" aria-label="search input example">
              {/* <SearchTask onSearchTask={searchTask}/> */}
            </TextInput>
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

        </React.Fragment>
      </Flex>
    </div>
  );
};
// }

// }

export default SearchBar;
