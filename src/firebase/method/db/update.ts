import { db } from "../../index";
import { doc, updateDoc } from "firebase/firestore";

export const update = async (path: string, data: object) => {
  try {
    const docRef = doc(db, path);
    await updateDoc(docRef, data);
    return "success";
  } catch (err) {
    throw err;
  }
};
