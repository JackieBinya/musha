import React from 'react';

export const AlertMessage = ({ message, isAuthenticated, setMessage }) => (
  <div className="alert-container">
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
  </div>
);
