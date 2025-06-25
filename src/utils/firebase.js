import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMwEfmH2BCa-8Kf4X2eodVfVxnEVq9YV0",
  authDomain: "mchat-8d6ef.firebaseapp.com",
  databaseURL: "https://mchat-8d6ef.firebaseio.com",
  projectId: "mchat-8d6ef",
  storageBucket: "mchat-8d6ef.appspot.com",
  messagingSenderId: "624124730943",
  appId: "1:624124730943:web:0a8738bb556f085fcc228a",
  measurementId: "G-B3M69NWSE2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export default app;
