import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignUp } from './SignUp';
import { FormMessage } from '../components/FormMessage';
import { PasswordInput } from '../components/PasswordInput';
import { EmailInput } from '../components/EmailInput';
import { firebase } from '../firebase';

export const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setIsAuthenticated(true);
      setMessage('Congrats 🥳, you are successfully logged in.');
      setTimeout(() => history.push('/my-properties'), 5000);
    } catch (error) {
      setIsAuthenticated(false);

      if (error.code === ' auth/invalid-email') {
        setMessage('🤖 email address is not valid');
      }
      if (error.code === 'auth/user-disabled') {
        setMessage('🤖 your account has been suspended');
      }
      if (error.code === 'auth/user-not-found') {
        setMessage('🤖 email does no exist!');
      }
      if (error.code === ' auth/wrong-password') {
        setMessage('🤖 incorrect password');
      }
    }
  };
  return (
    <>
      <Link to="/signup">Sign Up</Link>
      <h1>Login</h1>
      <form className="auth-form" onSubmit={handleLogin}>
        <FormMessage
          isAuthenticated={isAuthenticated}
          message={message}
          setMessage={setMessage}
        />
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput setPassword={setPassword} password={password} />
        <button type="submit">Continue</button>
      </form>
      <Link to="/password-reset">Have you forgotten your password?</Link>
    </>
  );
};
