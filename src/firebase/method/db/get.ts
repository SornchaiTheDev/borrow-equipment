import { db } from "../../index";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";

const getDocument = async (path: string) => {
  try {
    const docRef = doc(db, path);
    const result = await getDoc(docRef);
    return result.data();
  } catch (err) {
    throw err;
  }
};

const getAllFromCollection = async (collectionId: string) => {
  try {
    const colRef = collection(db, collectionId);
    const docs = await getDocs(colRef);
    const allDocs: DocumentData[] = [];
    docs.forEach((doc) => allDocs.push({ ...doc.data(), id: doc.id }));
    return allDocs;
  } catch (err) {
    throw err;
  }
};
export { getDocument, getAllFromCollection };
