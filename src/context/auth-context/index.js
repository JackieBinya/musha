import React, { useState, useEffect, createContext } from 'react';
import { ContextDevTool } from 'react-context-devtool';
import { firebase } from '../../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('Jackie');

  return (
    <AuthContext.Provider value={{ currentUser }}>
      <ContextDevTool context={AuthContext} id="0" displayName="AuthContext" />
      {children}
    </AuthContext.Provider>
  );
};
