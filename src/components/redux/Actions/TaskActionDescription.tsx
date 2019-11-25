import {FETCH_TASK_DESCRIPTION} from '../Actions/TaskActionType';
import {FETCH_TASK_YAML} from '../Actions/TaskActionType';

// eslint-disable-next-line require-jsdoc
export function fetchTaskDescription(id: any) {
  return function(dispatch: any) {
    fetch('http://localhost:5000/task/'+id)
        .then((response) => response.json())
        .then((Task) => {
          // eslint-disable-next-line
          fetch('http://localhost:5000/task/'+Task.name+'/'+'readme')
              .then((response) => response.text())
              .then((TaskDescription) => dispatch({
                type: FETCH_TASK_DESCRIPTION,
                payload: TaskDescription,
              }));
        });

    fetch('http://localhost:5000/task/'+id)
        .then((response) => response.json())
        .then((Task) => {
          // eslint-disable-next-line
          fetch('http://localhost:5000/task/'+Task.name+'/'+'yaml')
              .then((response) => response.text())
              .then((TaskYaml) => dispatch({
                type: FETCH_TASK_YAML,
                payload: TaskYaml,
              }));
        });
  };
}

export default fetchTaskDescription;
