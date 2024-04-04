import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export const AnonymousRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === undefined) {
    return null;
  }

  return isLoggedIn ? (
    <Navigate to={window.location.pathname} replace />
  ) : (
    <Outlet />
  );
};
