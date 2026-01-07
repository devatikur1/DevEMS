import {
  setDoc,
  addDoc,
  doc,
  collection,
  getDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../context/AppContext";

function useFirestore() {
  async function setData({ collId, docId, data }) {
    try {
      if (docId) {
        await setDoc(doc(db, collId, docId), data, { merge: true });
      } else {
        await addDoc(collection(db, collId), data);
      }
      return { isError: false, error: null };
    } catch (error) {
      return { isError: true, error };
    }
  }

  async function getData({ collId, docId, whereQuery }) {
    try {
      // 🔹 Single document
      if (docId) {
        const snap = await getDoc(doc(db, collId, docId));

        if (!snap.exists()) {
          return { isError: true, data: null };
        }

        return {
          isError: false,
          data: { id: snap.id, ...snap.data() },
        };
      }

      // 🔹 Collection
      const colRef = collection(db, collId);
      const q = whereQuery ? query(colRef, ...whereQuery) : colRef;
      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { isError: false, data, error: null };
    } catch (error) {
      return { isError: true, data: null, error };
    }
  }

  return [setData, getData];
}

export default useFirestore;
