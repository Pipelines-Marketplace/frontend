import {CHECK_USER_AUTHENTICATION} from '../Actions/TaskActionType';


const initialState={
  isAuthenticated: false,
};

const reducer=(state=initialState, action:any)=>{
  console.log('sdasd');

  switch (action.type) {
    case CHECK_USER_AUTHENTICATION:
      console.log('reducer');

      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default: return state;
  }
};

export default reducer;
