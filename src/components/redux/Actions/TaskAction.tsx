import {FETCH_TASK_SUCCESS} from '../Actions/TaskActionType';

// eslint-disable-next-line require-jsdoc
export function fetchTaskSuccess() {
  return function(dispatch: any) {
    fetch('http://localhost:5000/tasks')
        .then((response) => response.json())
        .then((TaskData) => dispatch({
          type: FETCH_TASK_SUCCESS,
          payload: TaskData,
        }));
  };
}

export default fetchTaskSuccess
;
