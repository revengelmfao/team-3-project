// import { useState } from 'react';
// import { Modal, Button } from 'antd';
import Nav from '../components/Nav';

// const [isLoginVisible, setLoginVisible] = useState(false);
// const [isSignupVisible, setSignupVisible] = useState(false);

// const showLogin = () => {
//   setLoginVisible(true);
// };

// const showSignup = () => {
//   setSignupVisible(true);
// };

// const handleLogin = () => {
//   //add login logic
//   setLoginVisible(false);
// };

// const handleSignup = () => {
//   //add signup logic
//   setSignupVisible(false);
// };

const LoginPage = () => {
  return (
    <>
      <div>
        <Nav />
      </div>
      <main>
        <h2>Log in or sign up to start planning today!</h2>
      </main>
    </>
  );
};

export default LoginPage;
//<Button onClick={showSignup}>Sign Up</Button>
//<Button onClick={showLogin}>Log In</Button>
