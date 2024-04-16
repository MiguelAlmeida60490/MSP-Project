import React, { createContext, useContext, useState, useEffect } from "react";
import { app } from "../services/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged(async (user) => {
        setCurrentUser(user);
        setLoading(false);
        if(user) {
            await getUser(user.uid);
        }
    });
    return unsubscribe;
  }, []);

  const getUser = async (userId) => {
    try {
      let userDoc;

      userDoc = await app.firestore().collection("doctors").doc(userId).get();
      if (userDoc.exists) {
        setUserData(userDoc.data());
        setRole("doctor");
        return;
      }
      userDoc = await app.firestore().collection("clients").doc(userId).get();
      if (userDoc.exists) {
        setUserData(userDoc.data());
        setRole("client");
        return;
      }
      userDoc = await app.firestore().collection("admins").doc(userId).get();
      if (userDoc.exists) {
        setUserData(userDoc.data());
        setRole("admin");
        return;
      }

      console.log("User document not found");
    } catch (error) {
      console.error("Error getting user data: ", error);
    }
  };

  const value = {
    currentUser,
    userData,
    role,
    getUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
