import firebase from 'firebase/app';
import 'firebase/auth';

const authenticate = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(cred => {
    //get token from firebase
    cred.user.getIdToken()
        //save the token to the session storage
      .then(token => sessionStorage.setItem('token',token));
  });
};

const logoutUser = () => firebase.auth().signOut();

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default {
  authenticate,
  logoutUser,
  getCurrentUid,
}; 