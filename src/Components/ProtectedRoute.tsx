import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { getDocument } from "../firebase/method/db";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [uid, setUid] = useLocalStorage("uid", "");
  useEffect(() => {
    getDocument(`users/${uid}`).then(
      (result) => result === undefined && setUid("")
    );
  }, []);
  if (!uid) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
