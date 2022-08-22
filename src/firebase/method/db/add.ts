import { db } from "../../index";
import { collection, addDoc } from "firebase/firestore";

const addDocToCollection = (collectionName: string, data: object) => {
  const docRef = collection(db, collectionName);
  addDoc(docRef, data);
};

export { addDocToCollection };
