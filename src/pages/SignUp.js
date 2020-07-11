import React, { useState } from 'react';
import { signUpHelper } from '../helpers';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

export const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpHelper(email, password);
      setMessage('User is successfully signed up');
      setPassword('');
      setEmail('');
      setIsSignedUp(true);
      setTimeout(() => history.push('/my-properties'), 5000);
    } catch (error) {
      setIsSignedUp(false);

      if (error.code === 'auth/email-already-in-use') {
        setMessage('Email is already taken!');
      }

      if (error.code === 'auth/invalid-email') {
        setMessage('Email is invalid!');
      }

      if (error.code === 'auth/weak-password') {
        setMessage('Password should be at least six characters long!');
      }
    }
  };

  const handleClick = () => setMessage('');

  return (
    <>
      <form onSubmit={handleSubmit} className="auth-form">
        <div
          className={`message-wrapper ${message ? 'message' : ''} ${
            isSignedUp ? 'success' : 'fail'
          }`}
        >
          <p>{message}</p>
          <button
            className="close-message"
            type="button"
            onClick={() => setMessage('')}
          >
            &times;
          </button>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="password-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'} 
            name="password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i onClick={() => setShowPassword(!showPassword)}>{eye}</i>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
