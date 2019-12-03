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
  const [toggle, setToggle] =useState('see more');

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:5000/tags')
          .then((res) => res.json())
          .then((data) => setTags(data));
    };
    fetchData();
  }, []);
  // sorting tags in alphabetical order
  tags.sort((a:any, b:any) =>
  (a.name> b.name) ? 1 :
  ((b.name > a.name) ? -1 : 0));
  // adding tags into array after click and display task based on tags
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
  console.log('tags ', tags);
  const newtags =tags.slice(0, 5);
  console.log('newtags', newtags);
  // / jsx element for show tags
  const showTags:any=
  newtags.map((it: any) => (
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

  ));

  const tagSize:number = tags.length;
  // /  for display more tags
  const moreTags=(e:any) =>{
    console.log(e.target.textContent);
    console.log(tagSize);
  };

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
      {showTags}
      {/* {
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

        ))} */}
      <a onClick={moreTags} id="see"> {toggle} </a>
    </div>
  );
};
export default Filter;
