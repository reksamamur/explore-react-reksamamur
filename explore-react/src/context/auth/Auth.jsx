import { createContext, useContext, useMemo } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useLocalStorage } from "../local-storage/useLocalStorage";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('admin', null);

  const handleLogin = async (data) => {
    if (data.username === "admin") {
      setUser(data);
      return true
    } else {
      console.log(new Error(`Not Admin`));
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={{ pathname: "/unauthorized", state: { from: location } }}
        replace
      />
    );
  }

  return <Outlet />;
};