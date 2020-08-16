import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const eye = <FontAwesomeIcon icon={faEye} />;

export const PasswordInput = ({ setPassword, password }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-wrapper">
      <label htmlFor="password">Password:</label>
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        className="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <i
        data-testid="svg-icon"
        onMouseEnter={() => setShowPassword(true)}
        onMouseLeave={() => setShowPassword(false)}
        onTouchStart={() => setShowPassword(true)}
        onTouchEnd={() => setShowPassword(false)}
      >
        {eye}
      </i>
    </div>
  );
};
