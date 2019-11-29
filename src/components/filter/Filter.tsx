/* eslint-disable consistent-return */
import React, {useState, useEffect} from 'react';

import './filter.css';
import {Checkbox} from '@patternfly/react-core/dist/js/components';

import store from '../redux/store';
export interface TagsData {
  name: string,
  status: boolean
}
const Filter: React.FC = (props:any) => {
  const tagsSet = new Set();
  const [tags, setTags] = useState([]);
  const [maxshow, setMaxshow] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:5000/tags')
          .then((res) => res.json())
          .then((data) => setTags(data));
    };
    fetchData();
  }, []);
  tags.sort((a:any, b:any) =>
  (a.name> b.name) ? 1 :
  ((b.name > a.name) ? -1 : 0));
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
          store.dispatch({type: 'FETCH_TASK_SUCCESS', payload: data});
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
  // const displayCategory = () => {
  //   let catStr: string = '';
  //   const catArray = Array.from(categorySet);
  //   if (catArray.length === 0) {
  //     displaytask();
  //     return false;
  //   }
  //   for (let i = 0; i < catArray.length; i++) {
  //     catStr = `${catStr + catArray[i]}|`;
  //   }
  // fetch(`http://localhost:5000/tasks?category=${catStr}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       store.dispatch({type: 'FETCH_TASK_SUCCESS', payload: data});
  //     });
  // const addCategory = (e: any) => {
  //   if (categorySet.has(e.target.value) === false) {
  //     categorySet.add(e.target.value);
  //   } else {
  //     categorySet.delete(e.target.value);
  //   }

  //   displayCategory();
  // };
  return (
    <div className="filter-size">
      <h2 style={{marginBottom: '1em'}}>
        {' '}
        <b>Types</b>
      </h2>
      <div style={{marginBottom: '0.4em'}}>
        <Checkbox
          style={{width: '1em', height: '1em'}}
          label="Task"
          id="Task"
          value="task"
          onClick={addTag}
          aria-label="uncontrolled checkbox example"
        />
      </div>
      <div>
        <Checkbox
          style={{width: '1em', height: '1em'}}
          label="Pipelines"
          id=" "
          value="pipelines"
          onClick={addTag}
          aria-label="uncontrolled checkbox example"
        />
      </div>
      <h2 style={{marginBottom: '1em', marginTop: '1em'}}><b> Tags </b></h2>
      {
        tags.map((it: any, index) => (
          <div key = {it} style={{marginBottom: '0.4em'}}>
            <Checkbox
              style={{width: '1em', height: '1em'}}
              label={it.name[0].toUpperCase()+it.name.slice(1)}
              value={it.name}
              id={it.id}
              onClick={addTag}
              aria-label="uncontrolled checkbox example"
            />
          </div>

        ))}
    </div>
  );
};
export default Filter;
