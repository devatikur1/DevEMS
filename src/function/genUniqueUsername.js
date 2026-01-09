import { doc, getDoc } from "firebase/firestore";
import { db } from "../context/AppContext";

export async function genUniqueUsername(baseName) {
  // Start with baseName
  let username = baseName;
  let exists = true;
  let counter = 0;

  while (exists) {
    const usersDoc = await getDoc(doc(db, "username", username));

    if (!usersDoc.exists()) {
      exists = false;
    } else {
      counter += 1;
      username = `${baseName}${counter}`;
    }
  }

  return username;
}
