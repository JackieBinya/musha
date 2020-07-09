import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { signUpHelper } from '../helpers';

//const schema = 

export const SignUp = ({ history }) => {
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onChange'
  });

  const handleSignUp = (data, e) => {
    alert(data.email)
    e.target.reset(); 
    console.log(data)
    /* e.preventDefault();
    try {
      await signUpHelper(email, password);
      setPassword('');
      setEmail('');
      history.push('/my-properties');
    } catch (error) {
      if (error) {
        console.log(error);
      }
    } */
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={register}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={register}
        />
        <label>Confirm Password:</label>
         <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          ref={register}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
