import {
  setDoc,
  addDoc,
  doc,
  collection,
  getDoc,
  query,
  getDocs,
  getCountFromServer,
  limit,
  startAfter,
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
  async function getData({
    collId,
    docId,
    isQuery,
    whereQuery,
    orderByy,
    limitt=11,
    startAfterr,
  }) {
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
      let queryConstraints = [];

      if (isQuery) {
        if (whereQuery.length) queryConstraints.push(...whereQuery);
        if (orderByy.length) queryConstraints.push(...orderByy);
        if (limitt) queryConstraints.push(limit(limitt));
        if (startAfterr) queryConstraints.push(startAfter(startAfterr));
      }
      const q = isQuery ? query(colRef, ...queryConstraints) : colRef;
      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let lastOne = null;

      if (data.length === limitt) {
        lastOne = snap.docs[snap.docs.length - 1];
      }

      return { status: true, data, lastOne, error: null };
    } catch (error) {
      return { status: false, data: null, error };
    }
  }

  // 🔹 Get Collection Length
  async function getCount({ collId, whereQuery }) {
    try {
      if (!collId) throw { code: "custom/collection-name-not-found" };
      const colRef = collection(db, collId);
      const q = whereQuery ? query(colRef, ...whereQuery) : colRef;
      const snapshot = await getCountFromServer(q);
      return { status: true, count: snapshot.data().count, error: null };
    } catch (error) {
      return { status: false, error };
    }
  }

  return { setData, getData, getCount };
}

export default useFirestore;
