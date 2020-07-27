import React, { useState } from 'react';
import { signUpHelper } from '../helpers';
import { AlertMessage } from '../components/AlertMessage';
import { PasswordInput } from '../components/PasswordInput';
import { EmailInput } from '../components/EmailInput';

export const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpHelper(email, password);
      setMessage('Congrats 🥳, your account has been successfully created!');
      setPassword('');
      setEmail('');
      setIsAuthenticated(true);
      setTimeout(() => history.push('/my-properties'), 5000);
    } catch (error) {
      setIsAuthenticated(false);

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
    <div className="container">
      <div className="form-container">
        <AlertMessage
          isAuthenticated={isAuthenticated}
          message={message}
          setMessage={setMessage}
        />
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit} className="form-primary auth-form">
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput setPassword={setPassword} password={password} />
          <button type="submit">Create your account</button>
        </form>
      </div>
    </div>
  );
};
