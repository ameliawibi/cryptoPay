import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

export function ProtectedRoute({ children }) {
  //to be replaced with token from useAuth later;
  //const { token } = useAuth();
  const [token, setToken] = useState(true);

  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
