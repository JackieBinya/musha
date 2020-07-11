import React from 'react';

export const FormMessage = ({ message, isAuthenticated, setMessage }) => (
  <div
    className={`message-wrapper ${message ? 'message' : ''} ${
      isAuthenticated ? 'success' : 'fail'
    }`}
  >
    <p>{message}</p>
    <button
      className="close-message"
      type="button"
      onClick={() => setMessage('')}
    >
      &times;
    </button>
  </div>
);
