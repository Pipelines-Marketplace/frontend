import {FETCH_TASKS} from './types';

export const fetchTasks=()=>(dispatch:any)=>{
  fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then((tasks)=>dispatch({
        type: FETCH_TASKS,
        payload: tasks,
      }));
};
