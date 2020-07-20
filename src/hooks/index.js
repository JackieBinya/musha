import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';

export const useProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('properties')
      .get()
      .then((data) => {
        const allProperties = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProperties([...allProperties]);
      });
  }, []);

  return { properties, setProperties };
};

export const useProperty = (id) => {
  const [property, setProperty] = useState('');

  useEffect(() => {
    firebase
      .firestore()
      .collection('properties')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const newProperty = doc.data();
          setProperty(newProperty);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return { property };
};

export const usePropertiesByUserID = (userId) => {
  const [userProperties, setUserProperties] = useState([]);
  console.log(userProperties);

  useEffect(() => {
    firebase
      .firestore()
      .collection('properties')
      .where('ownerID', '==', userId)
      .get()
      .then((data) => {
        const newProperties = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUserProperties([...newProperties]);
      })
      .catch((error) => console.log(error));
  }, []);

  return { userProperties };
};
