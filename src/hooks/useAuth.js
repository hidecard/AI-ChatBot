import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../utils/firebase";
import { showToast } from "../utils/toast";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Save user data to database
      await set(ref(database, "users/" + user.uid), {
        username: username,
        email: email,
        createdAt: new Date().toISOString(),
      });

      showToast("Registration successful!");
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Login successful!");
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("questionCount");
      showToast("Logged out successfully!");
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  return {
    register,
    login,
    logout,
    loading,
  };
};
