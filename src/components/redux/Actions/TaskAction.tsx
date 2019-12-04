import {FETCH_TASK_SUCCESS} from '../Actions/TaskActionType';

// eslint-disable-next-line require-jsdoc
export function fetchTaskSuccess() {
  return function(dispatch: any) {
    fetch(`${process.env.REACT_APP_BACKEND_API}/tasks`)
        .then((response) => response.json())
        .then((TaskData) => dispatch({
          type: FETCH_TASK_SUCCESS,
          payload: TaskData,
        }));
  };
}

export default fetchTaskSuccess
;
