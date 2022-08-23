import { db } from "../../index";
import { doc, updateDoc } from "firebase/firestore";

export const update = async (path: string, data: object) => {
  try {
    const docRef = doc(db, path);
    updateDoc(docRef, data);
  } catch (err) {
    throw err;
  }
};
