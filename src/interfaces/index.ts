import firebase from "firebase";

export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface IFirebase {
  firebase: firebase.app.App;
  fieldValue: any;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export type OnChangeEventType = React.FormEvent<HTMLInputElement>;
export type OnSubmitEventType = React.SyntheticEvent;
