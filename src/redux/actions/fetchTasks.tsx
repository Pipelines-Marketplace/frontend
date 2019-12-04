import {FETCH_TASKS} from './types';

export const fetchTasks=()=>(dispatch:any)=>{
  fetch(`${process.env.REACT_APP_BACKEND_API}/tasks`)
      .then((res) => res.json())
      .then((tasks)=>dispatch({
        type: FETCH_TASKS,
        payload: tasks,
      }));
};
