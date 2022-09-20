import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
//import { useAuth } from "../hooks/useAuth";
//import getCookie from "../utils/getCookie";

export function ProtectedRoute({ children }) {
  //to be used later
  /*const { isAuthenticated, reAuth } = useAuth();
  useEffect(() => {
    reAuth();
  }, [getCookie("x-access-token")]);
  */

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
