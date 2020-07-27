import React from 'react';

export const EmailInput = ({ email, setEmail }) => (
  <div>
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
);
