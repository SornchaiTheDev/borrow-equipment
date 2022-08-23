import { db } from "../../index";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const addDocToCollection = async (collectionName: string, data: object) => {
  const collectionRef = collection(db, collectionName);
  try {
    await addDoc(collectionRef, data);
  } catch (err) {
    throw err;
  }
};

const setDocToCollection = async (
  collectionName: string,
  docId: string,
  data: object,
  merge: boolean = false
) => {
  const docRef = doc(db, collectionName, docId);
  try {
    await setDoc(docRef, data, { merge });
  } catch (err) {
    throw err;
  }
};

export { addDocToCollection, setDocToCollection };
