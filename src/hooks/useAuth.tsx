import jwtDecode from "jwt-decode";
import React, { useState, useContext, createContext } from "react";
import { ExtendedJwtPayload } from "../types";
const Axios = require("axios").default;
interface AuthContextProps {
  isAuthenticated: any;
  signin: any;
  signup: any;
  signout: any;
  setAuthentication: any;
}

interface AuthProviderProps {
  children: any;
}

export const authContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const isValidToken = () => {
  const token = localStorage.getItem("userSessionToken");
  // JWT decode & check token validity & expiration.
  if (token) {
    const decoded = jwtDecode<ExtendedJwtPayload>(token);
    if (decoded.exp  && Date.now() <= decoded.exp * 1000) return true;
  }
  return false;
};

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useAuthProvider() {
  const [isAuthenticated, setAuthentication] = useState(isValidToken());

  const signin = ({ username, password }: any) => {
    return Axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email_address: username,
      password: password,
    });
  };

  const signup = (email: any, password: any) => {
    return new Promise(() => {
      setAuthentication(true);
    });
  };

  const signout = () => {
    return new Promise(() => {
      setAuthentication(false);
    });
  };

  // Returns auth methods
  return {
    isAuthenticated: isAuthenticated,
    setAuthentication,
    signin,
    signup,
    signout,
  };
}
