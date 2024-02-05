import React, {children, useState, createContext, useContext, useEffect} from 'react';
import { collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../Firebase/FirebaseConfig";
export const AppContext = createContext(null);


export default function AppContextProvider({children}) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = auth.currentUser;
      const fetchUserData = async () => {
        try {
          console.log("test, appContextpage");
          const uid = currentUser.uid;

          if (currentUser) {
            const userDocRef = doc(collection(db, "Users"), uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
              const fullName = userDocSnapshot.data().fullName;
              setUser(fullName);
            } else {
              console.error("User document does not exist");
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading: false,
        user: "Bob",
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

