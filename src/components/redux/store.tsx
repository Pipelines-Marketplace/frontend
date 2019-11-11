import {createStore, applyMiddleware} from 'redux'
import RootReducer from '../redux/Reducer/RootReducer'
import fetchTaskSuccess from './Actions/TaskAction'
import axios from 'axios'
import thunk from 'redux-thunk';
import { string } from 'prop-types';
// import fetchUsers from './Action'

export interface ResData{
    Name : string,
    Description : string,
    Rating : number,
    Downloads : number,
    YAML : string
  }
  export type obj = [ResData]
  
// import redux from 'redux'

// const fetchUsers = () => {
//     return function(dispatch: any){
//         axios.get('http://localhost:5000/tasks')
//         .then((response : any) => {
//                 //response.data
//                 // let TaskData = response.data.map((task:ResData) => task.Name) 

//                 let TaskData = response.data.map((task:ResData) => {
//                    let user: ResData = {
//                        Name: task.Name,
//                        Description: task.Description,
//                        Rating: task.Rating,
//                        Downloads: task.Downloads,
//                        YAML: task.YAML
//                    }
//                    return user;
//                 // const TaskData = response.data
//                 })
                
//                 // const TaskData : obj = response.data
//                 dispatch(fetchTaskSuccess(TaskData))
//             })
//             .catch((error : any) => {
//                 // error.message
//             })
//     }
// }

const store = createStore(RootReducer, applyMiddleware(thunk))

// console.log(store.getState())
// store.subscribe(() => {console.log(store.getState())})
// store.dispatch(fetchUsers())
export default store