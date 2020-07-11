import React, { useState } from 'react';
import { signUpHelper } from '../helpers';
import { FormMessage } from '../components/FormMessage';
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
      setMessage('User is successfully signed up');
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
    <>
      <form onSubmit={handleSubmit} className="auth-form">
        <FormMessage
          isAuthenticated={isAuthenticated}
          message={message}
          setMessage={setMessage}
        />
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput setPassword={setPassword} password={password} />
        <button type="submit">Create your account</button>
      </form>
    </>
  );
};
