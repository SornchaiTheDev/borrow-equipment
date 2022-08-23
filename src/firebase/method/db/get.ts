import { db } from "../../index";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  DocumentData,
  where,
  query,
  FieldPath,
  WhereFilterOp,
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

const findDocumentByField = async (
  collectionId: string,
  ...condition: [
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: unknown
  ]
) => {
  console.log(condition);
  try {
    const collectionRef = collection(db, collectionId);
    const queryRef = query(collectionRef, where(...condition));
    const docs = await getDocs(queryRef);
    const allDocs: DocumentData[] = [];
    docs.forEach((doc) => allDocs.push({ id: doc.id, ...doc.data() }));
    return allDocs;
  } catch (err) {
    throw err;
  }
};
export { getDocument, getAllFromCollection, findDocumentByField };
