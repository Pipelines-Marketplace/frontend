import {CHECK_USER_AUTHENTICATION} from '../Actions/TaskActionType';


const initialState={
  isAuthenticated: false,
};

const reducer=(state=initialState, action:any)=>{
  switch (action.type) {
    case CHECK_USER_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default: return state;
  }
};

export default reducer;
