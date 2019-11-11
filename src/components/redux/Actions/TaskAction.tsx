import {FETCH_TASK_SUCCESS} from '../Actions/TaskActionType'
import { dispatch } from 'd3';

// const fetchTaskSuccess = (TasksData: any) => {
    // return{
    //     type: FETCH_TASK_SUCCESS,
    //     payload : TasksData
    // }
export function fetchTaskSuccess () {
    return function(dispatch: any){
        // console.log('fetching')
        fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(TaskData => dispatch({
            // console.log(data)                
            type: FETCH_TASK_SUCCESS,
             payload : TaskData
      }));
    }
}

export default fetchTaskSuccess