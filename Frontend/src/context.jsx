import { createContext, useContext } from "react";
import { getCurrentUser } from "../../Backend/db/apiAuth";
import useFetch from "./hooks/use-fetch";

// 1. Create the context
const urlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const isAuthenticated = data?.user?.role === "authenticated";
console.log("isAuthenticated",data);

  return (
    <urlContext.Provider value={{ data, fetchUser, loading, isAuthenticated }}>
      {children}
    </urlContext.Provider>
  );
};

// 2. Custom hook to consume the context
export const useUrlState = () => {
  return useContext(urlContext);
};

export default UrlProvider;
