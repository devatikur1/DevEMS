import {
  collection,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../context/AppContext";

export async function generateUniqueUsername(baseName) {
  const usersRef = collection(db, "username");

  // Start with baseName
  let username = baseName.trim().toLowerCase().replace(/\s+/g, "");
  let exists = true;
  let counter = 0;

  while (exists) {
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getCountFromServer(q);
    const count = querySnapshot.data().count;

    if (count === 0) {
      exists = false;
    } else {
      counter += 1;
      username = `${baseName}${counter}`;
    }
  }

  return username;
}
