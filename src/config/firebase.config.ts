import firebase from "firebase";

export interface FirebaseConfig {
  apiKey?: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId?: string;
  measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  authDomain: "instagram-clone-48558.firebaseapp.com",
  projectId: "instagram-clone-48558",
  storageBucket: "instagram-clone-48558.appspot.com",
  messagingSenderId: "679932099445",
  measurementId: "G-DD242ZGNC6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
