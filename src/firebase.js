import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDHmhghTghm7IskDrUZp5qokfj6Du6hg_4",
  authDomain: "react-auth-d96cd.firebaseapp.com",
  projectId: "react-auth-d96cd",
  storageBucket: "react-auth-d96cd.appspot.com",
  messagingSenderId: "800260742721",
  appId: "1:800260742721:web:2a5904a5b321365aee30c0",
  measurementId: "G-4B288CWX2S",
});
// Initialize Firebase
firebase.analytics();

const auth = app.auth();

export { auth };
export default firebase;
