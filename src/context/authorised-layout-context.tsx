import React, { useState, useContext, createContext } from "react";
import { useRouter } from "../hooks/useRouter";

interface AuthorisedLayoutContextProps {
  siderCollapsed: boolean;
  toggleSider: any;
  selectedMenuItem: any;
  setMenuItem: any;
}

interface AuthorisedLayoutContextProviderProps {
  children: any;
}

export const useAuthorisedLayoutContext = createContext<
  AuthorisedLayoutContextProps
>({} as AuthorisedLayoutContextProps);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthorisedLayoutContextProvider({
  children,
}: AuthorisedLayoutContextProviderProps) {
  const context = useAuthorisedLayoutContextProviderProvider();
  return (
    <useAuthorisedLayoutContext.Provider value={context}>
      {children}
    </useAuthorisedLayoutContext.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuthorisedContext = () => {
  return useContext(useAuthorisedLayoutContext);
};

// Provider hook that creates context object and handles state
function useAuthorisedLayoutContextProviderProvider() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    router.pathname.split("/")[1]
  );
  const toggleSider = () => {
    return new Promise(() => {
      collapsed ? setCollapsed(false) : setCollapsed(true);
    });
  };
  const setMenuItem = (e: any) => {
    return new Promise(() => {
      setSelectedMenuItem(e.key);
      router.push(e.key);
    });
  };
  // Returns auth methods
  return {
    siderCollapsed: collapsed,
    toggleSider,
    selectedMenuItem: selectedMenuItem,
    setMenuItem,
  };
}
