import React, { useEffect } from 'react';
import './App.css';
import { firebase } from './firebase';

export const App = () => {
   useEffect(() => {
       firebase
         .firestore()
         .collection('properties')
         .get()
         .then((data) => {
            const newData = data.docs.map((doc) => ({
                 id: doc.id,
                 ...doc.data()
             }))
             console.log(newData)
         })
   })
    return <h1>MUSha</h1>
}