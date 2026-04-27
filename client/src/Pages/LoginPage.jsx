import Navbar from '../Components/Navbar';
import './LoginPage.css'
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LoginBox = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  const {
    isLoading, // true until Auth0 finds an active session
    isAuthenticated, // true after user returns from Auth0 or active session found
    error,
    loginWithRedirect,
  } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/listings")
    }
  }, [isAuthenticated, navigate]);

  const login = () => {
    loginWithRedirect({authorizationParams: {screen_hint: "login"}});
  }

  const register = () => {
    loginWithRedirect({authorizationParams: {screen_hint: "signup"}});
  }

  const ErrorBox = (
    <div id="login-box">
      <h2>Error Authentication</h2>
      <p>Sorry there was a problem authenticating your account, 
        please redirect to Auth0 or contact an administrator</p>
    </div>
  );

  const LoadingBox = (
    <div id="login-box">
      <h2>Just a moment.</h2>
      <p>Please wait while we redirect you to Auth0 for your login.</p>
    </div>
  );

  const UnAuthenticatedBox = (
    <div id="login-box">
      {isRegistering ? (
        <>
          <h2>Create an account</h2>
          <p>Join the 5-Colleges marketplace</p>
          <button id="login-submit" onClick={register}>Click to Register</button>
          <p className="register-text">
            Already have an account?{" "}
            <button id="register" onClick={() => setIsRegistering(false)}>Login</button>
          </p>
        </>
      ) : (
        <>
          <h2>Welcome back</h2>
          <p>Sign in to your account</p>
          <button id="login-submit" onClick={login}>Login</button>
          <p className="register-text">
            Don't have an account?{" "}
            <button id="register" onClick={() => setIsRegistering(true)}>Register</button>
          </p>
        </>
      )}
    </div>
  );

  if (error) {
    return ErrorBox;
  }

  if (isLoading) {
    return LoadingBox;
  } else {
    return UnAuthenticatedBox;
  }
}

const LoginPage = () => {
  return (
    <div id="login-viewport">
      <Navbar /> 
      <div id="login-container">
        <LoginBox />
      </div>
    </div>
  );
};

export default LoginPage;
