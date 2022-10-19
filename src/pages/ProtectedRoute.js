import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, reAuth } = useAuth();
  console.log("isAuthenticated: ", isAuthenticated);
  const location = useLocation();

  /*useEffect(() => {
    const reAuthAgain = async () => {
      console.log("reAuth again");
      await reAuth();
      console.log("isAuthenticated useEffect: ", isAuthenticated);
    };
    reAuthAgain();
    console.log("isAuthenticated useEffect: ", isAuthenticated);
  }, [isAuthenticated]);
  */

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
