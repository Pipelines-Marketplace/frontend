/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './filter.css';
import { Checkbox } from '@patternfly/react-core/dist/js/components';
import { all } from 'q';
import store from '../redux/store';
import { fetchTaskSuccess } from '../redux/Actions/TaskAction';


export interface TagsData {
  name: string,
  status: boolean
}
const Filter: React.FC = (props:any) => {
  const tagsSet = new Set();
  const categorySet = new Set();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:5000/tags').then((res) => res.json()).then((data) => setTags(data));
    };
    fetchData();
  }, []);

  const displaytask = () => {
    let str: string = '';
    if (tagsSet.has('task') === true) {
      tagsSet.delete('task');
    }
    if (tagsSet.has('pipelines') === true) {
      tagsSet.clear();
      tagsSet.add('pipelines');
    }
    const tagArray = Array.from(tagsSet);
    for (let i = 0; i < tagArray.length; i++) {
      if (i === 0 && tagArray[i] !== 'task') {
        str += '?tags=';
      }
      str = `${str + tagArray[i]}|`;
    }
    fetch(`http://localhost:5000/tasks${str}`)
      .then((res) => res.json())
      .then((data) => {
        store.dispatch({ type: 'FETCH_TASK_SUCCESS', payload: data });
      });
  };
  const addTag = (e: any) => {
    if (tagsSet.has(e.target.value) === false) {
      tagsSet.add(e.target.value);
    } else {
      console.log(e.target.value);
      tagsSet.delete(e.target.value);
    }

    displaytask();
  };
  const displayCategory = () => {
    let catStr: string = '';
    const catArray = Array.from(categorySet);
    if (catArray.length === 0) {
      displaytask();
      return false;
    }
    for (let i = 0; i < catArray.length; i++) {
      catStr = `${catStr + catArray[i]}|`;
    }
    fetch(`http://localhost:5000/tasks?category=${catStr}`)
      .then((res) => res.json())
      .then((data) => {
        // const allTasks = [...props.TaskData, ...data];
        // data.map((task:any) => allTasks.push(task));
        // console.log(allTasks);

        store.dispatch({ type: 'FETCH_TASK_SUCCESS', payload: data });
      });
  };
  const addCategory = (e: any) => {
    if (categorySet.has(e.target.value) === false) {
      categorySet.add(e.target.value);
    } else {
      categorySet.delete(e.target.value);
    }

    displayCategory();
  };
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="filter-size">
      <h2 style={{ marginBottom: '1em' }}>
        {' '}
        <b>Types</b>
      </h2>
      <div style={{ marginBottom: '0.4em' }}>
        <Checkbox
          style={{ width: '1em', height: '1em' }}
          label="Task"
          id="Task"
          value="task"
          onClick={addTag}
          aria-label="uncontrolled checkbox example"
        />
      </div>
      <div>
        <Checkbox
          style={{ width: '1em', height: '1em' }}
          label="Pipelines"
          id=" "
          value="pipelines"
          onClick={addTag}
          aria-label="uncontrolled checkbox example"
        />
      </div>
      <h2 style={{ marginBottom: '1em', marginTop: '1em' }}><b> Tags </b></h2>
      {
        tags.map((it: any) => (
          <div style={{ marginBottom: '0.4em' }}>
            <Checkbox
              style={{ width: '1em', height: '1em' }}
              label={it.name}
              value={it.name}
              id={it.id}
              onClick={addTag}
              aria-label="uncontrolled checkbox example"
            />
          </div>

        ))
      }
      <h2 style={{ marginBottom: '1em', marginTop: '1em' }}>
        {' '}
        <b>Categories</b>
        {' '}
      </h2>
      <div style={{ marginBottom: '0.4em' }}>
        <Checkbox
          style={{ width: '1em', height: '1em' }}
          label="Build"
          value="build"
          onClick={addCategory}
          aria-label="uncontrolled checkbox example"
          id="Build"
        />
      </div>
      <div style={{ marginBottom: '0.4em' }}>
        <Checkbox
          style={{ width: '1em', height: '1em' }}
          label="Test"
          value="test"
          onClick={addCategory}
          aria-label="uncontrolled checkbox example"
          id="Test"
        />
      </div>
      <Checkbox
        style={{ width: '1em', height: '1em' }}
        label="Deploy"
        value="deploy"
        onClick={addCategory}
        aria-label="uncontrolled checkbox example"
        id="Deploy"
      />
    </div>
  );
};
// const mapStateToProps = (state: any) => ({
//   TaskData: state.TaskData.TaskData,

// });
// export default connect(mapStateToProps, { fetchTaskSuccess })(Filter);

export default Filter;
