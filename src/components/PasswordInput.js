import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const eye = <FontAwesomeIcon icon={faEye} />;

export const PasswordInput = ({ setPassword, password }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
  );
};
