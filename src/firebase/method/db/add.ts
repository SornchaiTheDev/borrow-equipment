import { db } from "../../index";
import { collection, addDoc } from "firebase/firestore";

const addDocToCollection = async (collectionName: string, data: object) => {
  const docRef = collection(db, collectionName);
  try {
    await addDoc(docRef, data);
  } catch (err) {
    throw err;
  }
};

export { addDocToCollection };
