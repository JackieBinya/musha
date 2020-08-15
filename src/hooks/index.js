import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

export const useProperties = () => {
  const [properties, setProperties] = useState(null);

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
  const [property, setProperty] = useState(null);

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
  }, [id]);

  return { property };
};

export const usePropertiesByUserID = (userId) => {
  const [userProperties, setUserProperties] = useState(null);

  useEffect(() => {
    var unsubscribe = firebase
      .firestore()
      .collection('properties')
      .where('ownerID', '==', userId)
      .onSnapshot(function (querySnapshot) {
        const newProperties = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUserProperties([...newProperties]);
      });

    return () => unsubscribe();
  }, []);

  return { userProperties };
};
