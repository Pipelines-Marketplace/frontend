/* eslint-disable consistent-return */
import React, {useState, useEffect} from 'react';
import './filter.css';
import {Checkbox} from '@patternfly/react-core/dist/js/components';
import {API_URL} from '../../constants';

const Filter: React.FC = (props:any) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${API_URL}/tags`)
          .then((res) => res.json())
          .then((data) => setTags(data));
    };
    fetchData();
  }, []);
  // sorting tags in alphabetical order
  tags.sort((a:any, b:any) =>
  (a.name> b.name) ? 1 :
  ((b.name > a.name) ? -1 : 0));

  // / jsx element for show tags
  const showTags:any=
     tags.map((it: any) => (
       <div key = {it} style={{marginBottom: '0.5em'}}>
         <Checkbox
           style={{width: '1.2em', height: '1.2em'}}
           label={it.name[0].toUpperCase()+it.name.slice(1)}
           value={it.name}
           id={it.id}
           aria-label="uncontrolled checkbox example"
         />
       </div>
     ));
  const x=true;
  const add=(e:any) =>{
    console.log(e.target.checked);
    console.log('label', e.target.label);
    console.log('value', e.target.value);
  };
  return (
    <div className="filter-size">
      <h2 style={{marginBottom: '1em'}}>
        {' '}
        <b>Types</b>{'  '}
      </h2>
      <div style={{marginBottom: '0.5em'}}>
        <Checkbox
          // checked={x}
          style={{width: '1.2em', height: '1.2em'}}
          label="Task"
          id="Task"
          value="task"
          onClick={add}
          aria-label="uncontrolled checkbox example"
        />
      </div>
      <div>
        <Checkbox
          // checked={x}
          style={{width: '1.2em', height: '1.2em'}}
          label="Pipelines"
          id=" "
          value="pipelines"

          aria-label="uncontrolled checkbox example"
        />
      </div>
      <h2 style={{marginBottom: '1em', marginTop: '1em'}}><b> Tags </b></h2>
      {showTags}
    </div>
  );
};
export default Filter;
