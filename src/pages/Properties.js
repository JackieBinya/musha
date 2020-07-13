import React, { useState } from 'react';
import { firebase } from '../firebase';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { PostPropertyForm } from '../components/PostPropertyForm';

/* 
Authenticated users access a form they can use to list a new property
Users get their listed properties by id'
Users can update their properties
*/

export const Properties = ({ history }) => {
  const { path } = useRouteMatch();
  const handleLogOut = () => {
    firebase.auth().signOut();
    history.push('/');
  };

  return (
    <>
      <h1>Properties</h1>
      <button type="button" onClick={handleLogOut}>
        Logout
      </button>

      <Link to={`${path}/post`}>Post a property</Link>

      <Route path={`${path}/post`}>
        <PostPropertyForm />
      </Route>
    </>
  );
};
