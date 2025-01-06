import { useContext } from "react";
import { getCurrentUser } from "../../Backend/db/apiAuth";
import useFetch from "./hooks/use-fetch";

const UrlContext = useContext();

const urlProvider = ({ children }) => {
  const { data, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const isAuthenticated = data?.role === "authenticated";
  return <UrlContext.Provider value={{data, fetchUser, loading, isAuthenticated}}>{children}</UrlContext.Provider>;
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default urlProvider;
