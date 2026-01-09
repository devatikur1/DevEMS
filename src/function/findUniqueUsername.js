import { getDoc, doc } from "firebase/firestore";
import { db } from "../context/AppContext";

export async function findUniqueUsername(baseName) {
  const usersDoc = await getDoc(doc(db, "username", baseName));
  if (usersDoc.exists()) {
    return false;
  }
  return true;
}
