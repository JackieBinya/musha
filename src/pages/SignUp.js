import React, { useState } from 'react';
import { signUpHelper } from '../helpers';

export const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

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
  return (
    <>
      <form onSubmit={handleSubmit}>
        <p className={`message-container ${isSignedUp ? 'success' : 'fail'}`}>
          {message}
        </p>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
