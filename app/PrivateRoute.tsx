import { RootState } from "@reduxjs/toolkit/query";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  path: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, children }) => {
  const router = useRouter();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    router.push("/login");
  }

  return children;
};

export default PrivateRoute;
