/* eslint-disable consistent-return */
import {useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import './filter.css';
import {Checkbox} from '@patternfly/react-core/dist/js/components';
import store from '../redux/store';
import {API_URL} from '../../constants';
const Filter: React.FC = (props:any) => {
  const history = useHistory();
  const tagsSet = new Set();
  const [tags, setTags] = useState([]);
  const [toggle, setToggle] =useState('seeMore');
  const [i, setI] =useState(10);
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
  let tagArray:any=[];
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
    tagArray = Array.from(tagsSet);
    for (let i = 0; i < tagArray.length; i++) {
      if (i === 0 && tagArray[i] !== 'task') {
        str += '?tags=';
      }
      str = `${str + tagArray[i]}|`;
    }
    fetch(`${API_URL}/tasks${str}`)
        .then((res) => res.json())
        .then((data) => {
          store.dispatch({type: 'FETCH_TASK_SUCCESS', payload: data});
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
  const newtags =tags.slice(0, i);
  // / jsx element for show tags
  const showTags:any=
  newtags.map((it: any) => (
    <div key = {it} style={{marginBottom: '0.5em'}}>
      <Checkbox
        style={{width: '1.2em', height: '1.2em'}}
        label={it.name[0].toUpperCase()+it.name.slice(1)}
        value={it.name}
        id={it.id}
        onClick={addTag}
        aria-label="uncontrolled checkbox example"
      />
    </div>
  ));
  const tagSize:number = tags.length;
  const [lessTags, setLessTags] = React.useState(tagSize);
  // /  for display more tags
  const moreTags=(e:any) =>{
    if (i >= newtags.length ) {
      setI(tagSize);
      // temp = tagSize;
      setLessTags(tagSize);
      setToggle('seeLess');
    } else {
      setI(newtags.length+7);
    }
    if (e.target.text.match('seeLess')) {
      setI(lessTags-(13));
      setToggle('seeMore');
    }
  };
  const clearAll=() =>{
    history.push('/');
    window.location.reload();
  };
  return (
    <div className="filter-size">
      <h2 style={{marginBottom: '1em'}}>
        {' '}
        <b>Types</b>{'  '}
        <Link to="/" onClick={clearAll}
          style={{marginLeft: '2em'}}>
          ClearAll
        </Link>
      </h2>
      <div style={{marginBottom: '0.5em'}}>
        <Checkbox
          style={{width: '1.2em', height: '1.2em'}}
          label="Task"
          id="Task"
          value="task"
          onClick={addTag}
          aria-label="uncontrolled checkbox example"
        />
      </div>
      <div>
        <Checkbox
          style={{width: '1.2em', height: '1.2em'}}
          label="Pipelines"
          id=" "
          value="pipelines"
          onClick={addTag}
          aria-label="uncontrolled checkbox example"
        />
      </div>
      <h2 style={{marginBottom: '1em', marginTop: '1em'}}><b> Tags </b></h2>
      {showTags}
      <Link to="/" onClick={moreTags} id="see"> {toggle} </Link>
    </div>
  );
};
export default Filter;
