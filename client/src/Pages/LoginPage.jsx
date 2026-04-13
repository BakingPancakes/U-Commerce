import Navbar from '../Components/Navbar';
import './LoginPage.css'
import { useState } from 'react';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div id="login-viewport">
      <Navbar /> 
      <div id="login-container">
        <div id="login-box">
          {isRegistering ? (
            <>
              <h2>Create an account</h2>
              <p>Join the 5-Colleges marketplace</p>
              <input type="text"     className="input-field" placeholder="Username" />
              <input type="email"    className="input-field" placeholder="5-Colleges email" />
              <input type="password" className="input-field" placeholder="Password" />
              <input type="password" className="input-field" placeholder="Confirm password" />
              <button id="login-submit">Register</button>
              <p className="register-text">
                Already have an account?{" "}
                <button id="register" onClick={() => setIsRegistering(false)}>Login</button>
              </p>
            </>
          ) : (
            <>
              <h2>Welcome back</h2>
              <p>Sign in to your account</p>
              <input type="email"    className="input-field" placeholder="Username / 5-Colleges email" />
              <input type="password" className="input-field" placeholder="Password" />
              <button id="forgot-password">Forgot password?</button>
              <button id="login-submit">Login</button>
              <p className="register-text">
                Don't have an account?{" "}
                <button id="register" onClick={() => setIsRegistering(true)}>Register</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
