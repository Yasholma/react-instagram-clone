import { createContext } from "react";
import { firebase, FieldValue } from "../config/firebase.config";
import { IFirebase } from "../interfaces";

const FirebaseContext = createContext<IFirebase>({
  firebase: firebase.app(),
  fieldValue: FieldValue,
});

export default FirebaseContext;
