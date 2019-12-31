/* eslint-disable consistent-return */
import React, {useState, useEffect} from 'react';
import './filter.css';
import {Checkbox, Tooltip} from '@patternfly/react-core/dist/js/components';
import {API_URL} from '../../constants';
import {InfoCircleIcon} from '@patternfly/react-icons';

const Filter: React.FC = (props:any) => {
  const [tags, setTags] = useState();
  const [status, setStatus]=useState();
  const [x, setX]=useState(false);

  const tagitem =[{id: '1000', value: 'verified-task', isChecked: false},
    {id: '1001', value: 'task', isChecked: false},
    {id: '1003', value: 'pipelines', isChecked: false}];
  const taglist=(data:any) =>{
    data.map((it:any ) =>
      tagitem.push({id: String(it.id), value: it.name, isChecked: false}));
    return tagitem;
  };
  useEffect(() => {
    // const fetchData = async () => {
    fetch(`${API_URL}/tags`)
        .then((res) => res.json())
        .then((data) => setTags(taglist(data)));
    setStatus(tagitem);
  }, []);


  // sorting tags in alphabetical order
  // tags.sort((a:any, b:any) =>
  // (a.name> b.name) ? 1 :
  // ((b.name > a.name) ? -1 : 0));

  // dealing with after click
  const add=(e:any) =>{
    console.log('name', e.target.name);

    console.log('status', status);
    //  for mapping the items
    status.map((it:any) => {
      if (it.id === e.target.id) {
        it.isChecked=e.target.checked;
      }
    },
    );
    setStatus(status);
  };
  // / jsx element for show tags
  let showTags:any ='';
  if (status !== undefined) {
    showTags=
     status.map((it: any) => (
       <div key = {it} style={{marginBottom: '0.5em'}}>
         <Checkbox
           onClick={add}
           isChecked={it.isChecked}
           style={{width: '1.2em', height: '1.2em'}}
           label={it.value[0].toUpperCase()+it.value.slice(1)}
           value={it.value}
           name="Tags"
           id={it.id}
           aria-label="uncontrolled checkbox example"

         />
       </div>
     ));
  }
  const cleartag=() =>{
    status.map((it:any) =>{
      if (it.isChecked === true) {
        it.isChecked=false;
      }
    });
    setStatus(status);
    console.log('clearststsu', status);
  };
  return (
    <div className="filter-size">
      <h2 style={{marginBottom: '1em'}}>
        {' '}
        <a href="#" onClick={cleartag}> ClearAll</a>{'  '}
      </h2>
      <h2 style={{marginBottom: '1em'}}>
        {' '}
        <b>Verified Task</b>{'  '}
        <Tooltip content={<div>
           Verified Task and Pipelines by Tekton Catlog</div>}>
          <InfoCircleIcon />
        </Tooltip>
      </h2>
      <div style={{marginBottom: '0.5em'}}>
        <Checkbox
          // checked={x}
          style={{width: '1.2em', height: '1.2em'}}
          label="Verified Task"
          id="1000"
          value="vtask"
          name="VerifiedTask"
          onClick={add}
          aria-label="uncontrolled checkbox example"
        />
      </div>
      <h2 style={{marginBottom: '1em'}}>
        {' '}
        <b>Types</b>{'  '}
      </h2>
      <div style={{marginBottom: '0.5em'}}>
        <Checkbox
          // checked={x}
          style={{width: '1.2em', height: '1.2em'}}
          label="Task"
          name="Task"
          id="1001"
          value="task"
          onClick={add}
          aria-label="uncontrolled checkbox example"
        />
      </div>
      <div>
        <Checkbox
          onClick={add}
          style={{width: '1.2em', height: '1.2em'}}
          label="Pipelines"
          name="Pipelines"
          id="1002"
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
