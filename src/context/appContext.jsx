import { children, useState, createContext, useContext, useEffect } from 'react';
import { collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../Firebase/FirebaseConfig";

export const AppContext = createContext(null);

export default function AppContextProvider({children}) {
  const [userData, setUserData] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Ensure authentication is initialized before fetching user data
  useEffect(() => { 
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthInitialized(true);
      } else {
        setAuthInitialized(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("test, appContextpage");
        if (authInitialized) {
          const currentUser = auth.currentUser;

          if (currentUser) {
            const uid = currentUser.uid;
            const userDocRef = doc(collection(db, "Users"), uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
              setUserData(userDocSnapshot.data());
            }

          } else {
            console.error("User document does not exist");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [authInitialized]);

  return (
    <AppContext.Provider
      value={{
        userData: userData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};

