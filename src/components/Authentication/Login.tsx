import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
// import brandImg from './brandImgColor.svg';
import {
  LoginForm,
  LoginMainFooterBandItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import {ExclamationCircleIcon,
  GithubIcon,
  GoogleIcon,
  GitlabIcon} from '@patternfly/react-icons';
import checkAuthentication from '../redux/Actions/CheckAuthAction';
import {API_URL} from '../../constants';
import GitHubLogin from 'react-github-login';
import SearchBar from '../search-bar/SearchBar';

// const Login:React.FC=(props:any)=>{
//   const history = useHistory();
//   const [showHelperText, setShowHelperText]=useState(false);
//   const [usernameValue, setUsernameValue]=useState('');
//   const [isValidUsername, setIsValidUsername]=useState(true);
//   const [passwordValue, setPasswordValue]=useState('');
//   const [isValidPassword, setIsValidPassword]=useState(true);
//   const [isRememberMeChecked, setIsRememberMeChecked]=useState(false);

//   const handleUsernameChange=(value:any)=>{
//     setUsernameValue(value);
//   };

//   const handlePasswordChange=(passwordValue:any)=>{
//     setPasswordValue(passwordValue);
//   };

//   const onRememberMeClick=()=>{
//     const isChecked=isRememberMeChecked;
//     setIsRememberMeChecked(!isChecked);
//   };
//   // Authenticate the user with given credentials
//   const authenticationCheck=(username:string, password:string)=>{
//     fetch(`${API_URL}/login`, {
//       method: 'POST',
//       body: JSON.stringify({username: username, password: password}),
//     }).then((res)=>res.json())
//         .then((data)=>{
//           console.log(data);
//           if (data['token']) {
//             // Storing authentication data in local storage
//             localStorage.setItem('token', data['token']);
//             localStorage.setItem('usetrID', data['user_id']);
//             checkAuthentication();
//             setIsValidPassword(true);
//             setIsValidUsername(true);
//             history.push('/');
//             window.location.reload();
//           } else {
//             setIsValidPassword(false);
//             setIsValidUsername(false);
//             setShowHelperText(true);
//           }
//         });
//   };

//   // Handle on form submit
//   const onLoginButtonClick=(event:any)=>{
//     event.preventDefault();
//     if (usernameValue==='' || passwordValue==='') {
//       setIsValidUsername(false);
//       setIsValidPassword(false);
//       setShowHelperText(true);
//     } else {
//       setShowHelperText(false);
//       authenticationCheck(usernameValue, passwordValue);
//     }
//   };

//   const helperText = (
//     <React.Fragment>
//       <ExclamationCircleIcon color='red'/>
//             &nbsp;<span style={{color: 'red'}}>Invalid login credentials.</span>
//     </React.Fragment>
//   );

//   const signUpForAccountMessage = (
//     <LoginMainFooterBandItem>
//             Need an account? <a href="/signup">Sign up.</a>
//     </LoginMainFooterBandItem>
//   );
//   const forgotCredentials = (
//     <LoginMainFooterBandItem>
//       <a href="/">Forgot username or password?</a>
//     </LoginMainFooterBandItem>
//   );

//   const loginForm = (
//     <LoginForm
//       showHelperText={showHelperText}
//       helperText={helperText}
//       usernameLabel="Username"
//       usernameValue={usernameValue}
//       onChangeUsername={handleUsernameChange}
//       isValidUsername={isValidUsername}
//       passwordLabel="Password"
//       passwordValue={passwordValue}
//       onChangePassword={handlePasswordChange}
//       isValidPassword={isValidPassword}
//       rememberMeLabel="Keep me logged in for 30 days."
//       isRememberMeChecked={isRememberMeChecked}
//       onChangeRememberMe={onRememberMeClick}
//       onLoginButtonClick={onLoginButtonClick}
//     />
//   );
//   return (
//     <Card style={{maxWidth: '30em', margin: 'auto'}}>
//       <CardHeader style={{fontSize: '2em', marginBottom: 0}}>
//           Log in to your account</CardHeader>
//       <CardBody>{loginForm}</CardBody>
//       <Flex className="example-border"
//         breakpointMods={[{modifier: 'justify-content-space-evenly',
//           breakpoint: 'lg'}]}>
//         <FlexItem><GithubIcon size='md' color='grey'/></FlexItem>
//         <FlexItem><GoogleIcon size='md' color='grey'/></FlexItem>
//         <FlexItem><GitlabIcon size='md' color='grey'/></FlexItem>
//       </Flex>
//       <CardFooter style={{textAlign: 'center', marginTop: '2em'}}>
//         {signUpForAccountMessage}
//         {forgotCredentials}
//       </CardFooter>
//     </Card>
//   );
// };

const Login:React.FC=()=>{
  const history = useHistory();
  const onSuccess=(response)=>{
    console.log(response);
    const code={
      token: response.code.toString(),
    };
    fetch('http://localhost:5000/oauth/redirect', {
      method: 'POST',
      body: JSON.stringify(code),
    })
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data);
          localStorage.setItem('token', data['token']);
          localStorage.setItem('usetrID', data['user_id']);
          checkAuthentication();
          history.push('/');
          window.location.reload();
        },
        );
  };
  const onFailure=(error)=>{
    console.log(error);
  };
  useEffect(() => {
    document.getElementsByTagName('button')[2].style.backgroundColor='#1e66cc';
    document.getElementsByTagName('button')[2].style.padding='0.3em';
    document.getElementsByTagName('button')[2].style.width='50%';
    document.getElementsByTagName('button')[2].style.color='white';
  }, []);
  return (
    <div>
      <Card style={{maxWidth: '30em', margin: 'auto'}}>
        <CardHeader style={{fontSize: '2em', marginBottom: 0,
          textAlign: 'center'}}>
          <GithubIcon size="lg"/>
        </CardHeader>
        <CardBody style={{textAlign: 'center'}}>
          <GitHubLogin clientId="aac6161a58b4d7798f05"
            redirectUri=""
            onSuccess={onSuccess}
            onFailure={onFailure}
            id="1"
          />

        </CardBody>

      </Card>
    </div>
  );
};

// Handle mapStateToProps Here
export default Login;
