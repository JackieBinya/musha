import React, { useState, useEffect, createContext } from 'react';
import { firebase } from '../../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser'))
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      localStorage.removeItem('currentUser');
    }
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      <ContextDevTool context={AuthContext} id="0" displayName="AuthContext" />
      {children}
    </AuthContext.Provider>
  );
};
