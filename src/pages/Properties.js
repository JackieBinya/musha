import React from 'react';
import { firebase } from '../firebase';

/* 
Authenticated users access a form they can use to list a new property
Users get their listed properties by id
Users can update their properties
*/

export const Properties = () => {
  const handleLogOut = () => {
    firebase.auth().signOut();
  };

  return (
    <button type="button" onClick={handleLogOut}>
      Logout
    </button>
  );
};
