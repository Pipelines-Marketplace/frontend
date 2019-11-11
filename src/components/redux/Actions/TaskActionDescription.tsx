import {FETCH_TASK_DESCRIPTION} from '../Actions/TaskActionType'
import {FETCH_TASK_YAML} from '../Actions/TaskActionType'
import { dispatch } from 'd3';

export function fetchTaskDescription (name: any) {
    // const {name} = useParams();
    // console.log(name)
    return function(dispatch: any){
        // console.log('fetching')
        // fetch('http://localhost:5000/task/'+name)
        //     .then(response => response.json())

        fetch('http://localhost:5000/task/'+name)
        .then(response => response.json())
        .then(data => {
          const DescriptionUrl = data.Description
          fetch(DescriptionUrl)
          .then((res) => res.text())
            .then(TaskDescription => dispatch({
            type: FETCH_TASK_DESCRIPTION,
            payload : TaskDescription,
      }));
        const YamlUrl = data.YAML
        fetch(YamlUrl)
        .then((res) => res.text())
        // .then(data => console.log(data))
          .then(TaskYaml => dispatch({
          type: FETCH_TASK_YAML,
          payload : TaskYaml,
    }));
    })
}
}

export default fetchTaskDescription