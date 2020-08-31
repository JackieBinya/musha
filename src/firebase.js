import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyDD14Pef51sWG0czExRugPOLJO-Ne44bNI',
  authDomain: 'musha-000.firebaseapp.com',
  databaseURL: 'https://musha-000.firebaseio.com',
  projectId: 'musha-000',
  storageBucket: 'musha-000.appspot.com',
  messagingSenderId: '111803589651',
  appId: '1:111803589651:web:b90b953a233696281b4be6',
});

const storage = firebase.storage();

export { storage, firebaseConfig as firebase };
