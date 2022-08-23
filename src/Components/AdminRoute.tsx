import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { getDocument } from "../firebase/method/db";
import { User } from "../interface/User";

function AdminRoute({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User>();
  const [uid, setUid] = useLocalStorage("uid", "");

  useEffect(() => {
    if (uid) {
      getDocument(`users/${uid}`).then((user) => {
        if (!user) {
          return setUid("");
        }
        setUser(user as User);
      });
    }
  }, []);

  if (!uid) return <Navigate to="/admin" replace />;
  if (!user) return null;
  if (user.role !== "admin") return <Navigate to="/login" replace />;
  return children;
}

export default AdminRoute;
