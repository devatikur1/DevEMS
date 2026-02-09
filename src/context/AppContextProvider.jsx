import React, { useEffect, useRef, useState } from "react";
import { AppContext, auth, db } from "./AppContext";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import useFunction from "../hooks/useFunction";
import useFirestore from "../hooks/useFirestore";

export default function AppContextProvider({ children }) {
  // 🔹 authId-State
  const [isLogged, setIsLogged] = useState(
    Boolean(JSON.parse(localStorage.getItem("isLogged"))) || false,
  );
  const [userDt, setUserDt] = useState(
    JSON.parse(localStorage.getItem("userDt")) || {},
  );

  // 🔹 overviewdt-State && Ref
  const [noWorkspaces, setNoWorkspace] = useState(true);
  const [workspacesGetting, setWorkspacesGetting] = useState(false);
  const [lastWorkspaces, setLastWorkspace] = useState(null);
  const [workspaces, setWorkspace] = useState([]);
  const containerRef = useRef(null);

  // 🔹 custom hook
  const { getData } = useFirestore();
  const { genEmailbaseUid } = useFunction();

  // --------------------------
  // ✅ Get Current USer Data
  // --------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) throw { code: "auth/user-not-found" };

      // 🔹 Get Data
      try {
        const docSnap = await getData({
          collId: "users",
          docId: genEmailbaseUid(user.email),
        });

        if (docSnap.exists()) {
          let data = docSnap.data();
          localStorage.setItem("isLogged", "true");
          localStorage.setItem("userDt", JSON.stringify(data));
          setIsLogged(true);
          setUserDt(data);

          // 🔹 Get Workspaces Data
          setWorkspacesGetting(true);
          setNoWorkspace(false);
          try {
            const collectionRef = collection(db, `${data?.username}-workspace`);

            // 1. Get Collection er Count
            const countsnap = await getCountFromServer(collectionRef);
            const count = countsnap.data().count;

            // 3. Then Check count < 0 tahole Get Data
            if (count > 0) {
              const Limit = 10;
              const q = query(
                collectionRef,
                orderBy("serialid", "asc"),
                limit(Limit),
              );
              const querySnapshot = await getDocs(q);
              const wdata = querySnapshot.docs.map((doc) => doc.data());

              if (wdata.length === Limit && wdata.length !== count) {
                setLastWorkspace(
                  querySnapshot.docs[querySnapshot.docs.length - 1],
                );
              } else {
                setLastWorkspace(null);
              }
              setWorkspace(wdata);
              setNoWorkspace(false);
            } else {
              setWorkspace([]);
              setLastWorkspace(null);
              setNoWorkspace(true);
            }
          } catch (error) {
            console.log(error);
            setWorkspace([]);
            setLastWorkspace(null);
            setNoWorkspace(true);
          } finally {
            setWorkspacesGetting(false);
          }
        } else throw { code: "auth/user-not-found" };
      } catch (error) {
        console.error("🔥 Error fetching user data:", error);
        localStorage.removeItem("isLogged");
        localStorage.removeItem("userDt");
        setIsLogged(false);
        setUserDt({});
      }
    });

    return () => unsubscribe();
  }, []);

  // ---------------------
  // ✅ Value
  // ---------------------
  const value = {
    authId: {
      isLogged,
      setIsLogged,
      userDt,
      setUserDt,
    },
    overviewdt: {
      workspaces,
      setWorkspace,
      noWorkspaces,
      setNoWorkspace,
      workspacesGetting,
      setWorkspacesGetting,
      lastWorkspaces,
      setLastWorkspace,
    },
    containerRef,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
