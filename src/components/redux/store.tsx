import {createStore, applyMiddleware} from 'redux'
import RootReducer from '../redux/Reducer/RootReducer'
import thunk from 'redux-thunk';

export interface ResData{
    Name : string,
    Description : string,
    Rating : number,
    Downloads : number,
    YAML : string
  }
  export type obj = [ResData]

const store = createStore(RootReducer, applyMiddleware(thunk))

// console.log(store.getState())
// store.subscribe(() => {console.log(store.getState())})
// store.dispatch(fetchUsers())
export default store