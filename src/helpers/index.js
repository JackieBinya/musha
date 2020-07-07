import { firebase } from '../firebase';

export const signUpHelper = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((value) => resolve(value))
      .catch((error) => reject(error));
  });
};
