import {FETCH_TASK_DESCRIPTION} from '../Actions/TaskActionType';
import {FETCH_TASK_YAML} from '../Actions/TaskActionType';

// eslint-disable-next-line require-jsdoc
export function fetchTaskDescription(id: any) {
  return function(dispatch: any) {
    fetch(`${process.env.REACT_APP_BACKEND_API}/task/${id}`)
        .then((response) => response.json())
        .then(() => {
          fetch(`${process.env.REACT_APP_BACKEND_API}/task/${id}/readme`)
              .then((response) => response.text())
              .then((TaskDescription) => dispatch({
                type: FETCH_TASK_DESCRIPTION,
                payload: TaskDescription,
              }));
        });

    fetch(`${process.env.REACT_APP_BACKEND_API}/task/${id}`)
        .then((response) => response.json())
        .then(() => {
          fetch(`${process.env.REACT_APP_BACKEND_API}/task/${id}/yaml`)
              .then((response) => response.text())
              .then((TaskYaml) => dispatch({
                type: FETCH_TASK_YAML,
                payload: TaskYaml,
              }));
        });
  };
}

export default fetchTaskDescription;
