import {FETCH_TASK_NAME} from '../Actions/TaskActionType';

// eslint-disable-next-line require-jsdoc
export function fetchTaskName(id: number) {
  return function(dispatch: any) {
    fetch(`${process.env.REACT_APP_BACKEND_API}/task/${id}`)
        .then((response) => response.json())
        .then((TaskName) => dispatch({
          type: FETCH_TASK_NAME,
          payload: TaskName,
        }));
  };
}

export default fetchTaskName;
