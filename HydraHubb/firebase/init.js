import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBbO5Fv3fd1nKYmCZp0-LjiSjk-yM6FAag',
    authDomain: 'hydra-games.firebaseapp.com',
    databaseURL: 'https://hydra-games.firebaseio.com',
    projectId: 'hydra-games',
    storageBucket: 'hydra-games.appspot.com',
    messagingSenderId: '828049681201'
  })
}
//  firebase.initializeApp(config);
//  const firebaseApp = firebase.firestore()
// firebaseApp.settings({ timestampsInSnapshots: true });

//export firestore databse, so that we can import firestore in other files and interact with it.

// export default !firebase.apps.length
//   ? firebase.initializeApp(config).firestore()
//   : firebase.app().firestore();

const db = firebase.firestore()
// db.settings({ timestampsInSnapshots: true });
const GoogleProvider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()
const auth = firebase.auth()

export { storage, db, auth, GoogleProvider }
