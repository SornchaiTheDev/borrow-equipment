import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2I9UMRr1w7UU-XYnReqfAiUlu00nYneE",
  authDomain: "borrow-equipment.firebaseapp.com",
  projectId: "borrow-equipment",
  storageBucket: "borrow-equipment.appspot.com",
  messagingSenderId: "71653259783",
  appId: "1:71653259783:web:3f91fd95180f2e572b48a2",
  measurementId: "G-B84MF4X8C8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
