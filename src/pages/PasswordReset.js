import React, { useContext, useState } from 'react';
import { firebase } from '../firebase';
import { EmailInput } from '../components/EmailInput';
import { FormMessage } from '../components/FormMessage';

/********************
 *  Add continue url : https://firebase.google.com/docs/auth/web/passing-state-in-email-actions#passing_statecontinue_url_in_email_actions
 */

export const PasswordReset = ({ history }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setIsEmailSent(true);
      setMessage('Check your inbox for further instructions on how to reset your password! ');
      setTimeout(() => history.push('/'), 5000);
    } catch (error) {
        setIsEmailSent(false)
        if(error.code === 'auth/invalid-email'){
          return setMessage('Email invalid');
        }

        if(error.code === 'auth/user-not-found'){
            return setMessage('An account associated with the provided email does not exist!')
        }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <FormMessage
          isAuthenticated={isEmailSent}
          message={message}
          setMessage={setMessage}
        />
        <EmailInput email={email} setEmail={setEmail} />
        <button type="submit">Reset my password</button>
      </form>
    </>
  );
};
