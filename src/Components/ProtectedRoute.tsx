import { useLocalStorage } from "usehooks-ts";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [user] = useLocalStorage("uid", "");
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
