import { firebase } from "../config/firebase.config";

async function doesUsernameExist(username: string): Promise<boolean[]> {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data().email > 0);
}

export default doesUsernameExist;
