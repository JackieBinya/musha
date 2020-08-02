import React from 'react';

export const AlertMessage = ({
  message,
  isAuthenticated,
  setMessage,
  setIsAuthenticated,
}) => {
  const resetStyles = () => {
    setIsAuthenticated(false);
    setMessage('');
  };
  return (
    <div className="alert-container">
      <div
        className={`message-wrapper ${message ? 'message' : ''} ${
          isAuthenticated ? 'success' : 'fail'
        }`}
      >
        <p>{message}</p>
        <button className="close-message" type="button" onClick={resetStyles}>
          &times;
        </button>
      </div>
    </div>
  );
};
