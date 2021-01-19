import firebase from 'firebase';

const firebaseConfig = {
  // Your Config Goes Here
  apiKey: 'AIzaSyCgCi4n7IVFGG0fIJjRdPi6CHPGXBdnOgg',
  authDomain: 'whatsapp-web-clone-bjs.firebaseapp.com',
  databaseURL: 'https://whatsapp-web-clone-bjs.firebaseio.com',
  projectId: 'whatsapp-web-clone-bjs',
  storageBucket: 'whatsapp-web-clone-bjs.appspot.com',
  messagingSenderId: '719773049060',
  appId: '1:719773049060:web:d02325b6c9330fd7968cf1',
  measurementId: 'G-0C5MDQ78CT',
};

const whatsApp = firebase.initializeApp(firebaseConfig);

const db = whatsApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { provider, auth };
