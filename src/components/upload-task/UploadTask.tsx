import React, {useState} from 'react';
import './UploadTask.css';
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  ActionGroup,
  Button,
  ChipGroup,
  Chip,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Alert,
} from '@patternfly/react-core';
import {
  Link,
} from 'react-router-dom';
import {API_URL} from '../../constants';
const UploadTask: React.FC = () => {
  const intags: string[] = [];
  const [uploadMessage, setUploadMessage] = useState(' ');
  const [tags, setTags] = useState(intags);
  // alert message for task upload
  let sendStatus:any='';
  const alertMessage=(status :any) =>{
    if (status['status'] === false) {
      sendStatus = <Alert variant="danger"
        isInline title={status['message']} />;
    } else {
      sendStatus = <Alert variant="success"
        isInline title={status['message']} />;
    }
    return sendStatus;
  };
  // / function for uloading task file
  const submitdata = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formdata = {
      name: data.get('task-name'),
      description: data.get('description'),
      type: 'Task',
      tags: tags,
      github: data.get('tasklink'),
      user_id: Number(localStorage.getItem('usetrID')),
    };
    fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: JSON.stringify(formdata),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
        .then((data)=>
          setUploadMessage(alertMessage(data)));
  };
  const addTags = (event: any) => {
    event.preventDefault();
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };
  const removeTags = (indexToRemove: any) => {
    setTags([...tags.filter((val, index) =>
      index !== indexToRemove)]);
  };
  const [isOpen, set] = useState(false);
  const ontoggle =
  (isOpen: React.SetStateAction<boolean>) => set(isOpen);
  const onSelect = () => set(!isOpen);
  const dropdownItems = [
    <DropdownItem key="link">
      Task</DropdownItem>,
    <DropdownItem key="action"
      component="button">
          Pipeline
    </DropdownItem>,
  ];
  return (
    <Form className="flex-size" onSubmit={submitdata}
      style = {{marginLeft: '5em'}}>
      <h1 style={{fontSize: '2em',
        fontFamily: 'bold'}}>Upload </h1>
      <FormGroup
        label="Name"
        isRequired
        fieldId="task-name"
        helperText="Please provide your task name"
      >
        <TextInput
          isRequired
          type="text"
          id="task-name"
          name="task-name"
          autoComplete="off"
        />
      </FormGroup>
      <FormGroup
        isRequired label="Description"
        helperText="Please fill the description
        of your task."
        fieldId="description"
      >
        <TextArea style = {{height: '7em'}}
          name="description"
          id="description"
        />
      </FormGroup>
      <FormGroup label="Tags"
        isRequired fieldId="task-tag"
        helperText="Please provide
         tags name of your task"
      >
        <div className="tags-input">
          <ChipGroup>
            {tags.map((chip, index) => (
              <Chip key={index}
                onClick={() => removeTags(index)} >
                {chip}
              </Chip>
            ))}
          </ChipGroup>
          <TextInput
            style={{marginTop: '0.3em'}}
            isRequired
            type="text"
            id="task-tags"
            name="task-tags"
            onKeyPress=
              {(event) =>
                (event.key === 'Enter' ? addTags(event) : null)}
            placeholder="Press enter to add tags"
            autoComplete="off"
          />
        </div>
      </FormGroup>
      <FormGroup label="Type"
        fieldId="task-tag">
        <div>
          <Dropdown style = {{backgroundColor: 'whitesmoke', width: '20em'}}
            onSelect = {onSelect}
            toggle={<DropdownToggle onToggle={ontoggle}>
            Task</DropdownToggle>} // provide task type by default
            isOpen = {isOpen}
            dropdownItems={dropdownItems}
          />
        </div>
      </FormGroup>
      <FormGroup
        label="Github"
        isRequired
        helperText="Please provide the
         github link of your task"
        fieldId="tasklink"
      >
        <TextInput
          name="tasklink"
          id="tasklink"
        />
      </FormGroup>
      <b> {uploadMessage} </b>
      <ActionGroup>
        <Button id="Button"
          variant="primary"
          type="submit"
        >Submit Task</Button>
        <Link to="/" >
          <Button variant="secondary"
            type="submit">Cancel</Button>
        </Link>
      </ActionGroup>
    </Form>
  );
};
export default UploadTask;


