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
  const tags_set = new Set();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:5000/tags').then((res) => res.json()).then((data) => setTags(data));
    };
    fetchData();
  }, []);

  const displaytask = () => {
    let str:string = '';
    if(tags_set.has('task')=== true){
      tags_set.delete('task');
    }
    const tagArray = Array.from(tags_set);
    const len = tagArray.length;

    for (let i = 0; i < tagArray.length; i++) {
      if (i == 0 && tagArray[i] != 'task') {
        str += '?tags=';
      }
      str = `${str + tagArray[i]}|`;
    }
    console.log(str);
    fetch(`http://localhost:5000/tasks${str}`)
      .then((res) => res.json())
      .then((data) => store.dispatch({ type: 'FETCH_TASK_SUCCESS', payload: data }));
  };
  const add_tag = (e: any) => {
    if (tags_set.has(e.target.value) === false) {
      tags_set.add(e.target.value);
    } else {
      tags_set.delete(e.target.value);
    }

    displaytask();
  };
  return (
    <div className="filter-size">


      <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Categories</h2>
      <>

        <Checkbox label="Task" id="Task" value="task" onClick={add_tag} aria-label="uncontrolled checkbox example" />
        <Checkbox label="Pipelines" id=" " value="pipelines" onClick={add_tag} aria-label="uncontrolled checkbox example" />
      </>

      <h2 style={{ textAlign: 'center', marginBottom: '1em' }}> Tags </h2>

      <>
        {
         tags.map((it:any) => <Checkbox label={it.name} value={it.name} id={it.id} onClick={add_tag} aria-label="uncontrolled checkbox example" />,)
        }

      </>


      <h2 style={{ textAlign: 'center', marginBottom: '1em' }}> Types </h2>

      <>
        <Checkbox label="Build" value="build" onClick={add_tag} aria-label="uncontrolled checkbox example" id="Build" />
        <Checkbox label="Test" value="test" onClick={add_tag} aria-label="uncontrolled checkbox example" id="Test" />
        <Checkbox label="Deploy" value="deploy" onClick={add_tag} aria-label="uncontrolled checkbox example" id="Deploy" />
      </>
    </div>
  );
};
export default Filter;
