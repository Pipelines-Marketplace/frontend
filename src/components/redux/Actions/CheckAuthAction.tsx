import {CHECK_USER_AUTHENTICATION} from '../Actions/TaskActionType';
import store from '../store';
function checkAuthentication() {
  let isAuthenticated:boolean;
  if (localStorage.getItem('token')) isAuthenticated = true;
  else isAuthenticated = false;

  store.dispatch({
    type: CHECK_USER_AUTHENTICATION,
    payload: isAuthenticated,

  });
//   return function(dispatch:any) {
//     return dispatch({
//       type: CHECK_USER_AUTHENTICATION,
//       payload: isAuthenticated,
//     });
//   };
// };
}
export default checkAuthentication;
