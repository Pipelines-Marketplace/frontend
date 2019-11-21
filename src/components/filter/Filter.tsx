import React, { useState, useEffect } from 'react';
import './filter.css';
import { Checkbox } from '@patternfly/react-core/dist/js/components';
import { async } from 'q';
import { dispatch } from 'd3';
import { taggedTemplateExpression } from '@babel/types';
import store from '../redux/store';

export interface TagsData {
  name: string,
  status: boolean
}
const Filter: React.FC = (props: any) => {
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
    let str:string = '';
    if (tagsSet.has('task') === true) {
      tagsSet.delete('task');
    }
    //console.log(tagsSet);
    const tagArray = Array.from(tagsSet);

    for (let i = 0; i < tagArray.length; i++) {
      if (i == 0 && tagArray[i] != 'task') {
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
      tagsSet.delete(e.target.value);
    }

    displaytask();
  };

  const addCategory = (e:any) => {
    if (categorySet.has(e.target.value) === false) {
      categorySet.add(e.target.value);
    } else {
      categorySet.delete(e.target.value);
    }

  //  console.log(categorySet);
  }
  return (

    <div className="filter-size">
      <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>
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
      <h2 style={{ textAlign: 'center', marginBottom: '1em' }}><b> Tags </b></h2>
      {
         tags.map((it:any) => (
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
      <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>
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
export default Filter;
