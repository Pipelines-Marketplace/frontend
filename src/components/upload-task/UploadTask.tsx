import React, {useState} from 'react';
import './UploadTask.css';
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  ActionGroup,
  Button,
  Alert,
  ChipGroup,
  Chip,
  Grid,
  Dropdown,
  DropdownToggle,
  DropdownItem,
} from '@patternfly/react-core';
import {
  Link,
} from 'react-router-dom';


const UploadTask: React.FC = () => {
  // const [status, setStatus] = useState();
  const intags: string[] = [];
  const [uploadMessage, SetUploadMessage] = useState(' ');
  // const [buttonstatus, setButtonstatus] =useState(true);
  const [tags, setTags] = useState(intags);

  // const getAlert = (status:string) => {
  //   if (status.match('Success\n') === null ) {
  //     const alertTitle = status;
  //     setButtonstatus(true);
  //     return <Alert variant="danger" isInline title={alertTitle} />;
  //   } else {
  //     const alertTitle = 'Lint Validation Successful';
  //     setButtonstatus(false);
  //     return <Alert variant="success" isInline title={alertTitle} />;
  //   }

  //   return null;
  // };
  // for validation to task
  // const onchange = (event: any) => {
  //   const input =
  //    (document.querySelector('input[type="file"]') as HTMLInputElement);
  //   const data = new FormData();
  //   if (input.files != null) {
  //     data.append('file', input.files[0]);
  //     data.append(input.files[0].name, input.files[0]);
  //     fetch(`http://localhost:5001/lint/${input.files[0].name}`, {
  //       method: 'POST',
  //       body: data,
  //     }).then((res) => res.json()).then((d) =>{
  //       setStatus(getAlert(d));
  //     });
  //   }
  // };


  const submitdata = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    // const taskinfo = new FormData();
    const formdata = {
      name: data.get('task-name'),
      description: data.get('description'),
      type: 'Task',
      tags: tags,
      github: data.get('tasklink'),
      user_id: 1,
    };
    console.log(JSON.stringify(formdata));
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: JSON.stringify(formdata),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json()).then((data)=> SetUploadMessage(data.message));
  };
  const addTags = (event: any) => {
    event.preventDefault();
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };
  const removeTags = (indexToRemove: any) => {
    setTags([...tags.filter((val, index) => index !== indexToRemove)]);
  };

  const [isOpen, set] = useState(false);
  const ontoggle = (isOpen: React.SetStateAction<boolean>) => set(isOpen);
  const onSelect = () => set(!isOpen);

  const dropdownItems = [
    <DropdownItem key="link">Task</DropdownItem>,
    <DropdownItem key="action" component="button">
          Pipeline
    </DropdownItem>,
  ];

  return (
    <Form className="flex-size" onSubmit={submitdata}>
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
        helperText="Please fill description of your task"
        fieldId="description"
      >
        <TextArea
          name="description"
          id="description"
        />
      </FormGroup>
      <FormGroup label="Tags" isRequired fieldId="task-tag"
        helperText="Please provide tags name of your task"
      >


        <div className="tags-input">
          <ChipGroup>
            {tags.map((chip, index) => (
              <Chip key={index} onClick={() => removeTags(index)} >
                {chip}
              </Chip>
            ))}
          </ChipGroup>
          <TextInput
            isRequired
            type="text"
            id="task-tags"
            name="task-tags"
            onKeyPress=
              {(event) => (event.key === 'Enter' ? addTags(event) : null)}
            placeholder="Press enter to add tags"
            autoComplete="off"
          />
        </div>
      </FormGroup>

      <FormGroup label="Type" isRequired fieldId="task-tag">
        <Dropdown style = {{backgroundColor: 'white'}}
          onSelect = {onSelect}
          toggle={<DropdownToggle onToggle={ontoggle}>Task</DropdownToggle>}
          isOpen = {isOpen}
          dropdownItems={dropdownItems}
        />
      </FormGroup>

      <FormGroup
        label="Github"
        isRequired
        helperText="Please provide the github link of your task"
        fieldId="tasklink"
      >
        <TextInput
          name="tasklink"
          id="tasklink"
        />
      </FormGroup>
      {/* <form onChange={onchange}>
          <input type="file" accept=".yaml" id="file" name="taskfile" />
        </form>
        {status} */}
      <ActionGroup>

        <Button id="Button"
          variant="primary"
          type="submit"
        >Submit Task</Button>

        <Link to="/" >
          <Button variant="secondary" type="submit">Cancel</Button>
        </Link>
      </ActionGroup>
    </Form>

  );
};
export default UploadTask;


