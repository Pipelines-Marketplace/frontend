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
} from '@patternfly/react-core';
import {
  Link,
} from 'react-router-dom';

const UploadTask: React.FC = () => {
  const [status, setStatus] = useState('');

  const intags : string[] = [];
  const [tags, setTags] = useState(intags);
  //  for onchange file uploading ...
  const onchange = (event: any) => {
    const input =
      document.querySelector('input[type="file"]')as HTMLInputElement;
    const data = new FormData();
    if (input.files != null) {
      data.append('file', input.files[0]);
      data.append('user', 'hubot');
      data.append(input.files[0].name, input.files[0]);
      console.log(input.files[0]);
      fetch(`${process.env.REACT_APP_BACKEND_API}
      /lint/${input.files[0].name}`, {
        method: 'POST',
        body: data,
        // eslint-disable-next-line no-console
      }).then((res) => res.json()).then((d) => setStatus(d));
    }
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
    // taskinfo.append('file', file);
    taskinfo.append('data', JSON.stringify(formdata));

    //   for (var value of taskinfo.values()) {
    //     console.log(value);
    //  }

    fetch('https://b1d7348a-145b-4a5d-a596-8edfe3391c34.mock.pstmn.io/task', {
      method: 'POST',
      body: taskinfo,
      headers: {
        'Accept': 'application/json',
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

  // const alertVariant = 'default';
  let s;

  if (status !== '') {
    console.log('Success');
    console.log(status);

    console.log(status === 'Success');
    console.log(typeof (status));
    console.log(typeof ('Success'));


    if (status.length === 7) {
      const alertTitle = 'Validation Success';
      s = <Alert variant="success" isInline title={alertTitle} />;
    } else {
      console.log('bdjabdja');
      const alertTitle = status;
      s = <Alert variant="danger" isInline title={alertTitle} />;
    }
  } else {
    console.log('adsad');
    s = null;
  }
  return (
    <Form isHorizontal onSubmit={submitdata} className="form-size">
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
        />
      </FormGroup>

      <FormGroup
        label="Tags" isRequired fieldId="task-tag"
        helperText="Please provide tags name of your task"
      >
        <div className="tags-input">
          <ul id="tags">
            {tags.map((tag, index) => (
              <li key={tag} className="tag">
                <span className="tag-title"><b>{tag}</b></span>
                <span className="tag-close-icon" role="presentation"
                  onClick={() => removeTags(index)}>
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
      <FormGroup isRequired label="Description"
        helperText="Please fill description of your task"
        fieldId="description"
      >
        <TextArea
          name="description"
          id="description"
        />
      </FormGroup>
      <form onChange={onchange}>
        <input type="file" accept=".yaml" id="file" name="taskfile" />
        {/* <Alert variant={alertVariant} isInline title={alertTitle} /> */}
      </form>
      {s}
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
