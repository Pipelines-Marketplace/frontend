import {FETCH_TASKS} from '../actions/types';
const initialState={
  tasks: [
    {
      Name: '',
      Description: '',
      Rating: 0,
      Downloads: 0,
      YAML: '',
    },
  ],
};

const taskReducer=(state=initialState, action:any)=>{
  switch (action.type) {
    case FETCH_TASKS:
      console.log('dsdsd');
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    default:
      return state;
  }
};

export default taskReducer;

