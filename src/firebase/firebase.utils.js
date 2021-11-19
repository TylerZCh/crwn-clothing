import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyD8UpqVLhsT27AfN_iiNvv0eHiFMJ3mAYU",
  authDomain: "crwn-db-dd046.firebaseapp.com",
  projectId: "crwn-db-dd046",
  storageBucket: "crwn-db-dd046.appspot.com",
  messagingSenderId: "1062900423463",
  appId: "1:1062900423463:web:83ad399166999c72466702",
  measurementId: "G-2YXS83FPSY"
};

  export const createUserProfileDocument = async(userAuth, additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      }catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;