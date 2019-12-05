import React, {useState} from 'react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
  Button,
  FlexItem,
  Flex} from '@patternfly/react-core';
import {API_URL} from '../../constants';

// Interface representing new user
interface registerUser{
    username:string,
    email:string,
    firstname:string,
    lastname:string,
    password:string
}
const SignupForm=()=> {
  const [username, setUsername]=useState('');
  const [email, setEmail]=useState('');
  const [firstName, setFirstName]=useState('');
  const [lastName, setLastName]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [isPasswordValid, setIsPasswordValid]=useState(true);

  // Register new user
  const registerUser=()=>{
    if (password!==confirmPassword) {
      const isValid=isPasswordValid;
      setIsPasswordValid(!isValid);
    }
    const newUser:registerUser={
      username: username,
      email: email,
      firstname: firstName,
      lastname: lastName,
      password: password,
    };
    fetch(`${API_URL}/signup`, {
      method: 'POST',
      body: JSON.stringify(newUser),
    }).then((res)=>res.json())
        .then((data)=>console.log(data));
  };
  return (
    <Card style={{maxWidth: '40.5em', margin: 'auto'}}>
      <CardHeader style={{fontSize: '2em', textAlign: 'center'}}>
          Create a new account</CardHeader>
      <CardBody>
        <Form>
          <FormGroup
            label="Username"
            isRequired
            fieldId="simple-form-username"
            helperText="Please provide your username"
          >
            <TextInput
              isRequired
              type="text"
              id="simple-form-username"
              name="simple-form-username"
              aria-describedby="simple-form-name-helper"
              value={username}
              onChange={(username)=>setUsername(username)}
            />
          </FormGroup>
          <FormGroup label="Email" isRequired fieldId="simple-form-email">
            <TextInput
              isRequired
              type="email"
              id="simple-form-email"
              name="simple-form-email"
              value={email}
              onChange={(email)=>setEmail(email)}
            />
          </FormGroup>
          <Flex breakpointMods={
            [{modifier: 'align-self-flex-end', breakpoint: 'lg'}]}>
            <FlexItem>
              <FormGroup label="First name"
                isRequired fieldId="simple-form-first-name">
                <TextInput
                  isRequired
                  type="text"
                  id="simple-form-first-name"
                  name="simple-form-first-name"
                  value={firstName}
                  onChange={(firstName)=>setFirstName(firstName)}
                />
              </FormGroup>
            </FlexItem>
            <FlexItem>
              <FormGroup label="Last Name"
                isRequired fieldId="simple-form-last-name">
                <TextInput
                  isRequired
                  type="text"
                  id="simple-form-last-name"
                  name="simple-form-last-name"
                  value={lastName}
                  onChange={(lastName)=>setLastName(lastName)}
                />
              </FormGroup>
            </FlexItem>
          </Flex>
          <FormGroup label="Password"
            isRequired fieldId="simple-form-password">
            <TextInput
              isRequired
              type="password"
              id="simple-form-password"
              name="simple-form-password"
              value={password}
              onChange={(password)=>setPassword(password)}
            />
          </FormGroup>
          <FormGroup label="Confirm Password"
            isRequired fieldId="simple-form-confirm-password"
            helperTextInvalid="Password doesn't match">
            <TextInput
              isRequired
              isValid={isPasswordValid}
              type="password"
              id="simple-form-confirm-password"
              name="simple-form-confirm-password"
              value={confirmPassword}
              onChange={(confirmPassword)=>{
                setConfirmPassword(confirmPassword);
                setIsPasswordValid(password===confirmPassword)
                ;
              }}
            />
          </FormGroup>
          <div style={{margin: 'auto'}}>
            <ActionGroup>
              <Button variant="primary" onClick={registerUser}>Register</Button>
            </ActionGroup>
          </div>
        </Form>
      </CardBody>
      <CardFooter style={{textAlign: 'center'}}>
          Already have an account?<a href="/login">{'  '}Login</a></CardFooter>
    </Card>
  );
};

export default SignupForm;
