import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../context/AppContext";

export async function findUniqueUsername(baseName) {
  const usersRef = collection(db, "username");

  // Start with baseName
  let username = baseName.trim().toLowerCase().replace(/\s+/g, "");

  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return false;
  }

  return true;
}
