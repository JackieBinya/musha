import React, { useState } from 'react';
import { firebase } from '../firebase';
import { EmailInput } from '../components/EmailInput';
import { AlertMessage } from '../components/AlertMessage';

/********************
 *  Add continue url : https://firebase.google.com/docs/auth/web/passing-state-in-email-actions#passing_statecontinue_url_in_email_actions
 */

export const PasswordReset = ({ history }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setIsEmailSent(true);
      setMessage(
        'Check your inbox for further instructions on how to reset your password! '
      );
      setTimeout(() => history.push('/'), 5000);
    } catch (error) {
      setIsEmailSent(false);
      if (error.code === 'auth/invalid-email') {
        setMessage('Email invalid');
      }

      if (error.code === 'auth/user-not-found') {
        setMessage(
          'An account associated with the provided email does not exist!'
        );
      }
    }
  };

  return (
    <div className="container">
      <div className="container-inner">
        <div className="form-container">
          <AlertMessage
            isAuthenticated={isEmailSent}
            message={message}
            setMessage={setMessage}
          />
          <h1>Password Reset</h1>
          <form onSubmit={handleSubmit} className="form-primary">
            <EmailInput email={email} setEmail={setEmail} />
            <button data-testid="submit-action" type="submit">
              Reset my password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
