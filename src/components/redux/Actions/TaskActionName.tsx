import {FETCH_TASK_NAME} from '../Actions/TaskActionType'
import { dispatch } from 'd3';

export function fetchTaskName (name: any) {
    // const {name} = useParams();
    // console.log(name)
    return function(dispatch: any){
        // console.log('fetching')
        fetch('http://localhost:5000/task/'+name)
            .then(response => response.json())
            .then(TaskName => dispatch({
            // console.log(data)                
            type: FETCH_TASK_NAME,
             payload : TaskName
      }));
    }
}

export default fetchTaskName