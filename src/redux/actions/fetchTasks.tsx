import {FETCH_TASKS} from './types';
import {API_URL} from '../../constants';

export const fetchTasks=()=>(dispatch:any)=>{
  fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((tasks)=>dispatch({
        type: FETCH_TASKS,
        payload: tasks,
      }));
};
