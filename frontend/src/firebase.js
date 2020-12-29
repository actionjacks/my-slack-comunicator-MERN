import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCTacaQgdSlTCyOGQLsj1XMQT4p9O5uzMA",
  authDomain: "my-slack-8ee92.firebaseapp.com",
  projectId: "my-slack-8ee92",
  storageBucket: "my-slack-8ee92.appspot.com",
  messagingSenderId: "945930323210",
  appId: "1:945930323210:web:f98f036ca318d4277926f3",
  measurementId: "G-DF4X7KW9YM",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
