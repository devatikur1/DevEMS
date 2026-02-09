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
  // 🔹 Set Data
  async function setData({ collId, docId, data }) {
    try {
      if (docId) {
        await setDoc(doc(db, collId, docId), data, { merge: true });
      } else {
        await addDoc(collection(db, collId), data);
      }
      return { status: true, error: null };
    } catch (error) {
      return { status: false, error };
    }
  }

  // 🔹 Get Data
  async function getData({ collId, docId, whereQuery }) {
    try {
      // 🔹 Single document
      if (docId) {
        const snap = await getDoc(doc(db, collId, docId));

        if (!snap.exists()) {
          return { status: false, data: null };
        }

        return {
          status: true,
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

      return { status: true, data, error: null };
    } catch (error) {
      return { status: false, data: null, error };
    }
  }

  async function getCount(collId) {
    if (collId) throw { code: "custom/collection-name-not-found" }
    try {
      if (collId) {
        await setDoc(doc(db, collId, docId), data, { merge: true });
      
      return { status: true, error: null };
    } catch (error) {
      return { status: false, error };
    }
  }

  return { setData, getData };
}

export default useFirestore;
