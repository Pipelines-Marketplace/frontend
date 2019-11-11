import {combineReducers} from 'redux'
import TaskReducer from './TaskReducer'
import TaskReducerName from './TaskReducerName'
 
export default combineReducers({
    TaskData: TaskReducer,
    TaskName: TaskReducerName
})


