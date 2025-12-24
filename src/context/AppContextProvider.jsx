import React, { useEffect, useState } from "react";
import { AppContext, auth, db } from "./AppContext";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
} from "firebase/firestore";

export default function AppContextProvider({ children }) {
  // 🔹 authId-State
  const [isLogged, setIsLogged] = useState(
    Boolean(JSON.parse(localStorage.getItem("isLogged"))) || false
  );
  const [userDt, setUserDt] = useState(
    JSON.parse(localStorage.getItem("userDt")) || {}
  );
  const [workspacesGetting, setWorkspacesGetting] = useState(false);
  const [workspaces, setWorkspace] = useState([]);

  // --------------------------
  // ✅ Get Current USer Data
  // --------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        localStorage.removeItem("isLogged");
        localStorage.removeItem("userDt");
        setIsLogged(false);
        setUserDt({});
        return;
      }

      // 🔹 Get Data
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));

        if (docSnap.exists()) {
          let data = docSnap.data();
          localStorage.setItem("isLogged", "true");
          localStorage.setItem("userDt", JSON.stringify(data));
          setIsLogged(true);
          setUserDt(data);

          // 🔹 Get Workspaces Data
          setWorkspacesGetting(true);
          try {
            const collectionRef = collection(db, `${data?.username}-workspace`);

            // 1. Get Collection er Count
            const countsnap = await getCountFromServer(collectionRef);
            const count = countsnap.data().count;

            // 3. Then Check count < 0 tahole Get Data
            if (count > 0) {
              const querySnapshot = await getDocs(collectionRef);
              const wdata = querySnapshot.docs.map((doc) => doc.data());
              setWorkspace(wdata);
            } else {
              setWorkspace([]);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setWorkspacesGetting(false);
          }
        } else {
          localStorage.removeItem("isLogged");
          localStorage.removeItem("userDt");
          setIsLogged(false);
          setUserDt({});
        }
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
      workspacesGetting,
      setWorkspacesGetting,
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
