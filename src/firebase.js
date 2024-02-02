import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "clinic-booking-25920.firebaseapp.com",
  projectId: "clinic-booking-25920",
  storageBucket: "clinic-booking-25920.appspot.com",
  messagingSenderId: "407719448378",
  appId: "1:407719448378:web:8f391798c6e034772eca03",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
