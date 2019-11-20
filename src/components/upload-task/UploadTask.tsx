/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import './UploadTask.css';
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  ActionGroup,
  Button,
} from '@patternfly/react-core';
import {
  Link,
} from 'react-router-dom';

const UploadTask: React.FC = () => {
  const [file, setFile] = useState('');
  const [, setFilename] = useState('choose file');

  const intags : string[] = [];
  const [tags, setTags] = useState(intags);
  //  for onchange file uploading ...
  const onchange = (event: any) => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
    const filename = event.target.files[0];
    fetch(`http://localhost:5001/lint/${filename.name}`, {
      method: 'POST',
      body: file,
    // eslint-disable-next-line no-console
    }).then((resp) => console.log(resp));
  };


  const submitdata = (event:any) => {
    event.preventDefault();
    //    console.log(file);
    //    console.log('file data ')
    const data = new FormData(event.target);
    const taskinfo = new FormData();
    const listtag = (`${data.get('task-tags')}`).split(',');
    const formdata = {
      name: data.get('task-name'),
      tags: listtag,
      description: data.get('description'),

    };
    taskinfo.append('file', file);
    taskinfo.append('data', JSON.stringify(formdata));

    //   for (var value of taskinfo.values()) {
    //     console.log(value);
    //  }

    fetch('https://b1d7348a-145b-4a5d-a596-8edfe3391c34.mock.pstmn.io/task', {
      method: 'POST',
      body: taskinfo,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  // adding tags
  const addTags = (event:any) => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };
  const removeTags = (indexToRemove:any) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  // eslint-disable-next-line no-console
  console.log(tags);
  return (
    <Form isHorizontal onSubmit={submitdata} className="form-size">
      <FormGroup
        label="Task-Name"
        isRequired
        fieldId="task-name"
        helperText="Please provide your task name"
      >
        <TextInput
          isRequired
          type="text"
          id="task-name"
          name="task-name"
        />
      </FormGroup>
      <FormGroup label="Task-Tags" isRequired fieldId="task-tag" helperText="Please provide tags name of your task">


        <div className="tags-input">
          <ul id="tags">
            {tags.map((tag, index) => (
              <li key={tag} className="tag">
                <span className="tag-title"><b>{tag}</b></span>
                <span className="tag-close-icon" role="presentation" onClick={() => removeTags(index)}>
                  {'  '}
                  <b>x</b>
                </span>
              </li>
            ))}
          </ul>
          <TextInput
            isRequired
            type="text"
            id="task-tags"
            name="task-tags"
            onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
            placeholder="Press enter to add tags"
          />
        </div>


      </FormGroup>
      <FormGroup isRequired label="Task Description" helperText="Please fill description of your task" fieldId="description">
        <TextArea
          name="description"
          id="description"
        />
      </FormGroup>
      <form onChange={onchange}>
        <input type="file" accept=".yaml" id="file" name="taskfile" />
      </form>

      <ActionGroup>
        <Button disabled variant="primary" type="submit">Submit Task</Button>
        <Link to="/">
          {' '}
          <Button variant="secondary">Cancel</Button>
          {' '}
        </Link>
      </ActionGroup>
    </Form>

  );
};
export default UploadTask;
