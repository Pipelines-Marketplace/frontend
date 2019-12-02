import {CHECK_USER_AUTHENTICATION} from '../Actions/TaskActionType';


function checkAuthentication() {
  let isAuthenticated:boolean;
  if (localStorage.getItem('token')) isAuthenticated = true;
  else isAuthenticated = false;

  return function(dispatch:any) {
    console.log(dispatch);
    return dispatch({
      type: CHECK_USER_AUTHENTICATION,
      payload: isAuthenticated,
    });
  };
};

export default checkAuthentication;
