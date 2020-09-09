import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertMessage } from '../components/AlertMessage';
import { PasswordInput } from '../components/PasswordInput';
import { EmailInput } from '../components/EmailInput';
import { firebase } from '../firebase';
import { Footer } from '../components/Footer';

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
      setEmail('');
      setPassword('');
      setMessage('Congrats 🥳, you are successfully logged in.');
      setTimeout(() => history.push('/my-properties'), 3000);
    } catch (error) {
      setIsAuthenticated(false);

      if (error.code === 'auth/invalid-email') {
        setMessage('Email address is not valid!');
      }
      if (error.code === 'auth/user-disabled') {
        setMessage('Your account has been suspended!');
      }
      if (error.code === 'auth/user-not-found') {
        setMessage('Email does no exist!');
      }
      if (error.code === 'auth/wrong-password') {
        setMessage('Invalid password!');
      }
    }
  };

  return (
    <>
      <main className="container">
        <div className="container-inner">
          <div className="form-container">
            <AlertMessage
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              message={message}
              setMessage={setMessage}
            />
            <h1>Login</h1>
            <form className="form-primary auth-form" onSubmit={handleLogin}>
              <EmailInput email={email} setEmail={setEmail} />
              <PasswordInput setPassword={setPassword} password={password} />
              <button data-testid="submit-action" type="submit">
                Continue
              </button>
            </form>
            <Link to="/password-reset">Have you forgotten your password?</Link>
          </div>
        </div>
      </main>
      <Footer lock="lock" />
    </>
  );
};
