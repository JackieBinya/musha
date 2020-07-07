import React, { useState } from 'react';
import { signUpHelper } from '../helpers';

export const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpHelper(email, password);
      setPassword('');
      setEmail('');
      history.push('/my-properties');
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
