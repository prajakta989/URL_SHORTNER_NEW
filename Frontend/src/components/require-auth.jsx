import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlState } from "@/context";
import { BarLoader } from "react-spinners";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useUrlState();
  console.log("navigate", loading);

  useEffect(() => {
    if (isAuthenticated === "authenticated" && loading === false)
      navigate("/auth");
  }, [loading, isAuthenticated]);

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;
  if (isAuthenticated) return children;
};

export default RequireAuth;
