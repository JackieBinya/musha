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
