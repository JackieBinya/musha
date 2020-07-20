import React, { useState, useContext } from 'react';
import { firebase } from '../firebase';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { PostPropertyAdForm } from './PostPropertyAdForm';
import { usePropertiesByUserID } from '../hooks';
import { AuthContext } from '../context/auth-context';
import { Loader } from '../components/Loader';
import { ShortProperty } from '../components/ShortProperty';
import { PropertyIcons } from '../components/PropertyIcons';

/* 
Authenticated users access a form they can use to list a new property
Users get their listed properties by id'
Users can update their properties
*/

export const Properties = ({ history }) => {
  const { path } = useRouteMatch();
  const { currentUser } = useContext(AuthContext);
  const { userProperties } = usePropertiesByUserID(currentUser.uid);

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
        <PostPropertyAdForm />
      </Route>

      {!userProperties ? (
        <Loader />
      ) : (
        userProperties.map(
          ({
            city,
            location,
            imageUrls,
            numberOfBathrooms,
            numberOfBedrooms,
            title,
            description,
            id,
          }) => (
            <div key={id}>
              <h3>{title ? title : `New property in ${location}`}</h3>
              <ShortProperty imageUrls={imageUrls}>
                <p>{description}</p>
                <PropertyIcons
                  id={id}
                  city={city}
                  location={location}
                  numberOfBathrooms={numberOfBathrooms}
                  numberOfBedrooms={numberOfBedrooms}
                  user={currentUser}
                />
              </ShortProperty>
            </div>
          )
        )
      )}
    </>
  );
};
