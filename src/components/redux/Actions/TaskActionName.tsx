import {FETCH_TASK_NAME} from '../Actions/TaskActionType';

// eslint-disable-next-line require-jsdoc
export function fetchTaskName(id: any) {
  // const {name} = useParams();
  // console.log(name)
  return function(dispatch: any) {
    fetch('http://localhost:5000/task/'+id)
        .then((response) => response.json())
        .then((TaskName) => dispatch({
          // console.log(data)
          type: FETCH_TASK_NAME,
          payload: TaskName,
        }));
  };
}

export default fetchTaskName;
