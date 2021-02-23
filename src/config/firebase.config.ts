import firebase from "firebase";
import { IFirebaseConfig } from "../interfaces";

const firebaseConfig: IFirebaseConfig = {
  apiKey: "AIzaSyBCVy0vbnkTSeG01dqaCNjy3lTboG4jx-8",
  authDomain: "instagram-clone-48558.firebaseapp.com",
  projectId: "instagram-clone-48558",
  storageBucket: "instagram-clone-48558.appspot.com",
  messagingSenderId: "679932099445",
  appId: "1:679932099445:web:9615bc6ef3787fab39b13c",
  measurementId: "G-DD242ZGNC6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const { FieldValue } = firebase.firestore;

export { firebase, FieldValue };
