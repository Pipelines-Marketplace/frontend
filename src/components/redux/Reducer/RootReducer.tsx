import {combineReducers} from 'redux'
import TaskReducer from './TaskReducer'
import TaskReducerName from './TaskReducerName'
import TaskReducerDescription from './TaskReducerDescription'
export default combineReducers({
    TaskData: TaskReducer,
    TaskName: TaskReducerName,
    TaskDescription: TaskReducerDescription,
    TaskYaml : TaskReducerDescription
})


