import firebase from "firebase";

const firebaseConfig = {
  // Your Config Goes Here
};

const whatsApp = firebase.initializeApp(firebaseConfig);

const db = whatsApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { provider, auth };
