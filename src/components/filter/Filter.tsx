import React, { useState,useEffect } from 'react';
import './filter.css';
import { Checkbox } from '@patternfly/react-core/dist/js/components';
import { async } from 'q';
import { dispatch } from 'd3';
import store from '../redux/store';
import { taggedTemplateExpression } from '@babel/types';
export interface TagsData {
  name: string,
  status: boolean
}
const Filter: React.FC = (props: any) => {
  const tags_set = new Set();
const [tags,setTags]=useState([]);

useEffect( () => {
  const fetchData = async () => {
  const result = await fetch('http://localhost:5000/tags').then(res => res.json()).then(data => setTags(data));
  };
  fetchData();
}, []);

  const displaytask= () => {
  var str:string ="";
 const tagArray = Array.from(tags_set);
 const len = tagArray.length;

 for(var i=0 ;i<tagArray.length ;i++)
 {
   if(i==0 && tagArray[i]!=" "){
     str=str+"?tags=";
   }
   str= str+tagArray[i]+'|'; 

 }
  fetch('http://localhost:5000/tasks'+str)
  .then(res => res.json())
  .then(data => store.dispatch({type:'FETCH_TASK_SUCCESS', payload:data}));
  }
  const add_tag = (e: any) => {
    if (tags_set.has(e.target.value) === false) {
      tags_set.add(e.target.value);
    }
    else {
      tags_set.delete(e.target.value);
    }

    displaytask();
  }
  return (
    <div className="filter-size">


      <h2 style={{ textAlign: "center", marginBottom: "1em" }}>Categories</h2>
      <React.Fragment >

        <Checkbox label="Task" id="Task" value=" " onClick={add_tag} aria-label="uncontrolled checkbox example" />
        <Checkbox label="Pipelines" id=" " value="pipelines" onClick={add_tag} aria-label="uncontrolled checkbox example" />
      </React.Fragment>

      <h2 style={{ textAlign: "center", marginBottom: "1em" }}> Tags </h2>

      <React.Fragment >
        {
         tags.map((it:any) => 
         <Checkbox label={it.name} value={it.name}  id={it.id} onClick={add_tag} aria-label="uncontrolled checkbox example" /> 
         )
        }
        
      </React.Fragment>


      <h2 style={{ textAlign: "center", marginBottom: "1em" }}> Types </h2>

      <React.Fragment>
        <Checkbox label="Build" value="build" onClick={add_tag} aria-label="uncontrolled checkbox example" id="Build" />
        <Checkbox label="Test" value="test" onClick={add_tag} aria-label="uncontrolled checkbox example" id="Test" />
        <Checkbox label="Deploy" value="deploy" onClick={add_tag} aria-label="uncontrolled checkbox example" id="Deploy" />
      </React.Fragment>
    </div>
  )
}
export default Filter;
