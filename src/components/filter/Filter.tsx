/* eslint-disable consistent-return */
import React,
{useState,
  useEffect}
  from 'react';
import './filter.css';
import {Checkbox,
  Tooltip,
  Button,
} from '@patternfly/react-core/dist/js/components';
import {API_URL} from '../../constants';
import {InfoCircleIcon} from '@patternfly/react-icons';
import store from '../redux/store';
import {FETCH_TASK_SUCCESS} from '../redux/Actions/TaskActionType';
const Filter: React.FC = (props:any) => {
  const [, setTags] = useState();
  const [status, setStatus]=useState();
  const [max, setMax]=useState(18);
  const [, setX]=useState(1); //
  const [clear, setClear]=useState(' ');
  const [show, setShow]=useState('seeMore');
  const tagitem :any =[{id: '1000', value: 'task', isChecked: false},
    {id: '1001', value: 'pipeline', isChecked: false},
    {id: '1002', value: 'verified', isChecked: false}];
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
    // eslint-disable-next-line
  }, []);
  // / dummy function for refreshing component
  const ddff=() =>{
    setX((x) => x+1);
  };
  //  formation of filter url for fetching task and pipelines
  const filterurl=(e:any) =>{
    let typeurl='all';
    let verifiedurl='all';
    let tagsurl = '';

    status.forEach((it:any) => {
      if (it.id === e.target.id) {
        it.isChecked=e.target.checked;
      }
    },
    );
    setStatus(status);
    ddff();
    const temptype = status.slice(0, 2);
    const tempverified=status.slice(2, 3);
    const temptags=status.slice(3);
    if (tempverified[0].isChecked === true) {
      verifiedurl='true';
    }
    if (temptype[0].isChecked === true) {
      typeurl='task';
    }
    if (temptype[1].isChecked === true) {
      typeurl ='pipeline';
    }
    if ((temptype[0].isChecked === true) &&
       (temptype[1].isChecked === true)) {
      typeurl = 'all';
    }
    temptags.forEach((it:any) =>{
      if (it.isChecked === true) {
        tagsurl+=it.value+'|';
      }
      if (it.isChecked === true) {
        setClear('ClearAll');
      }
    });
    // console.log(' tags', temptags[0].isChecked, temptags[0].value);
    fetch(`${API_URL}/resources/${typeurl}/${verifiedurl}?tags=${tagsurl} `)
        .then((resp) => resp.json())
        .then((data) =>{
          store.dispatch(
              {
                type: FETCH_TASK_SUCCESS,
                payload: data,
              },
          );
        });

    // console.log/
  //  ('urll', `${API_URL}/${typeurl}/${verifiedurl}?tags=${tagsurl} `);
  };

  // /   for clearing all checkbox
  const cleartag=(e:any) =>{
    // window.location.reload();
    status.forEach((it:any) =>{
      if (it.isChecked === true) {
        it.isChecked=false;
      }
    });
    setStatus(status);
    ddff();
    filterurl(e);
    setClear('');
  };
  let showresource:any;
  if (status !== undefined) {
    const resource =status.slice(0, 2);
    showresource = resource.map((it: any) => (
      <div key = {it} style={{marginBottom: '0.5em'}}>
        <Checkbox
          onClick={filterurl}
          isChecked={it.isChecked}
          style={{width: '1.2em', height: '1.2em'}}
          label={it.value[0].toUpperCase()+it.value.slice(1)}
          value={it.value}
          name="type"
          id={it.id}
          aria-label="uncontrolled checkbox example"

        />
      </div>
    ));
  }
  let showverifiedtask:any;
  // jsx element for show verifiedtask
  if ( status !== undefined) {
    const verifiedtask=status.slice(2, 3);
    showverifiedtask = verifiedtask.map((it: any) => (
      <div key = {it} style={{marginBottom: '0.5em'}}>
        <Checkbox
          onClick={filterurl}
          isChecked={it.isChecked}
          style={{width: '1.2em', height: '1.2em'}}
          label={it.value[0].toUpperCase()+it.value.slice(1)}
          value={it.value}
          name="verified"
          id={it.id}
          aria-label="uncontrolled checkbox example"

        />
      </div>
    ));
  }
  // jsx element for show tags
  let showTags:any ='';
  if (status !== undefined) {
    const tempstatus=status.slice(3, max);
    tempstatus.sort((a:any, b:any) =>
  (a.value> b.value) ? 1 :
  ((b.value > a.value) ? -1 : 0));
    showTags=
     tempstatus.map((it: any) => (
       <div key = {it} style={{marginBottom: '0.5em'}}>
         <Checkbox
           onClick={filterurl}
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
  // /  for showing more
  const seeMore=(e:any) =>{
    console.log('ddd', (e.target.text).length);
    if ((e.target.text).slice(0, 7) === 'seeMore') {
      console.log('ene83289');
    }
    const x=max;
    // x=x+10;
    if (x< status.length) {
      setMax(status.length);
      setShow('seeLess');
    } else {
      setMax((x) => x-13);
      setShow('seeMore');
    }
  };

  return (
    <div className="filter-size">
      <h2 style={{marginBottom: '1em'}}>
        {' '}
        <Button component='a' variant='link'
          onClick={cleartag}> {clear} </Button>{'  '}
      </h2>
      <h2 style={{marginBottom: '1em'}}>
        {' '}
        <b>Types</b>{'  '}
      </h2>
      {showresource}
      <h2 style={{marginBottom: '1em', marginTop: '1em'}}>
        {' '}
        <b>Verified </b>{'  '}
        <Tooltip content={<div>
           Verified Task and Pipelines by Tekton Catlog</div>}>
          <InfoCircleIcon />
        </Tooltip>
      </h2>
      {showverifiedtask}
      <h2 style={{marginBottom: '1em', marginTop: '1em'}}><b> Tags </b></h2>
      {showTags}
      <Button component='a' variant='link'
        onClick={seeMore}>{show} </Button>

    </div>
  );
};
export default Filter;


// /* eslint-disable consistent-return */
// import {useHistory, Link} from 'react-router-dom';
// import React, {useState, useEffect} from 'react';
// import './filter.css';
// import {Checkbox} from '@patternfly/react-core/dist/js/components';
// import store from '../redux/store';
// import {API_URL} from '../../constants';
// const Filter: React.FC = (props:any) => {
//   const history = useHistory();
//   const tagsSet = new Set();
//   const [tags, setTags] = useState([]);
//   const [toggle, setToggle] =useState('seeMore');
//   const [i, setI] =useState(10);
//   useEffect(() => {
//     const fetchData = async () => {
//       await fetch(`${API_URL}/tags`)
//           .then((res) => res.json())
//           .then((data) => setTags(data));
//     };
//     fetchData();
//   }, []);
//   // sorting tags in alphabetical order
//   tags.sort((a:any, b:any) =>
//   (a.name> b.name) ? 1 :
//   ((b.name > a.name) ? -1 : 0));
//   let tagArray:any=[];
//   // filterurling tags into array after click and display task based on tags
//   const displaytask = () => {
//     let str: string = '';
//     if (tagsSet.has('task') === true) {
//       tagsSet.delete('task');
//     }
//     if (tagsSet.has('pipelines') === true) {
//       tagsSet.clear();
//       tagsSet.filterurl('pipelines');
//     }
//     tagArray = Array.from(tagsSet);
//     for (let i = 0; i < tagArray.length; i++) {
//       if (i === 0 && tagArray[i] !== 'task') {
//         str += '?tags=';
//       }
//       str = `${str + tagArray[i]}|`;
//     }
//     fetch(`${API_URL}/tasks${str}`)
//         .then((res) => res.json())
//         .then((data) => {
//           store.dispatch({type: 'FETCH_TASK_SUCCESS', payload: data});
//         });
//   };
//   const filterurlTag = (e: any) => {
//     if (tagsSet.has(e.target.value) === false) {
//       tagsSet.filterurl(e.target.value);
//     } else {
//       tagsSet.delete(e.target.value);
//     }
//     displaytask();
//   };
//   const newtags =tags.slice(0, i);
//   // / jsx element for show tags
//   const showTags:any=
//   newtags.map((it: any) => (
//     <div key = {it} style={{marginBottom: '0.5em'}}>
//       <Checkbox
//         style={{width: '1.2em', height: '1.2em'}}
//         label={it.name[0].toUpperCase()+it.name.slice(1)}
//         value={it.name}
//         id={it.id}
//         onClick={filterurlTag}
//         aria-label="uncontrolled checkbox example"
//       />
//     </div>
//   ));
//   const tagSize:number = tags.length;
//   const [lessTags, setLessTags] = React.useState(tagSize);
//   // /  for display more tags
//   const moreTags=(e:any) =>{
//     if (i >= newtags.length ) {
//       setI(tagSize);
//       // temp = tagSize;
//       setLessTags(tagSize);
//       setToggle('seeLess');
//     } else {
//       setI(newtags.length+7);
//     }
//     if (e.target.text.match('seeLess')) {
//       setI(lessTags-(13));
//       setToggle('seeMore');
//     }
//   };
//   const clearAll=() =>{
//     history.push('/');
//     window.location.reload();
//   };
//   return (
//     <div className="filter-size">
//       <h2 style={{marginBottom: '1em'}}>
//         {' '}
//         <b>Types</b>{'  '}
//         <Link to="/" onClick={clearAll}
//           style={{marginLeft: '2em'}}>
//           ClearAll
//         </Link>
//       </h2>
//       <div style={{marginBottom: '0.5em'}}>
//         <Checkbox
//           style={{width: '1.2em', height: '1.2em'}}
//           label="Task"
//           id="Task"
//           value="task"
//           onClick={filterurlTag}
//           aria-label="uncontrolled checkbox example"
//         />
//       </div>
//       <div>
//         <Checkbox
//           style={{width: '1.2em', height: '1.2em'}}
//           label="Pipelines"
//           id=" "
//           value="pipelines"
//           onClick={filterurlTag}
//           aria-label="uncontrolled checkbox example"
//         />
//       </div>
//       <h2 style={{marginBottom: '1em', marginTop: '1em'}}><b> Tags </b></h2>
//       {showTags}
//       <Link to="/" onClick={moreTags} id="see"> {toggle} </Link>
//     </div>
//   );
// };
// export default Filter;
