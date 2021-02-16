import React, { useState, useContext, createContext } from "react";
import { useRouter } from "../hooks/useRouter";
import { userWalletsBalanceProps } from "../types";

interface IactiveWalletProps {
  currency: string;
  balance: number;
}
interface AuthorisedLayoutContextProps {
  siderCollapsed: boolean;
  toggleSider: any;
  selectedMenuItem: any;
  setMenuItem: any;
  activeWallet: IactiveWalletProps;
  setactiveWallet: React.Dispatch<
    React.SetStateAction<{
      currency: string;
      balance: number;
    }>
  >;
  userWallets: userWalletsBalanceProps[];
  userDetails: any;
}

interface AuthorisedLayoutContextProviderProps {
  children: any;
}

export const useAuthorisedLayoutContext = createContext<AuthorisedLayoutContextProps>(
  {} as AuthorisedLayoutContextProps
);

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
  const [activeWallet, setactiveWallet] = useState<IactiveWalletProps>({
    balance: 0,
    currency: "",
  });
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
  const userWallets: Array<userWalletsBalanceProps> = [
    { currency: "TZS", amount: 3000 },
    { currency: "USD", amount: 6000 },
    { currency: "RWF", amount: 65000 },
    { currency: "GBP", amount: 65000 },
    { currency: "KES", amount: 65000 },
  ];

  const userDetails = {
    // image: imageUrl,
    name: "Thomson Paul John",
    email: "tpaulJohn@rocketmail.com",
    // phone: "+250756312987",
    // language: "Spanish"
  }

  // Returns auth methods
  return {
    siderCollapsed: collapsed,
    toggleSider,
    selectedMenuItem: selectedMenuItem,
    setMenuItem,
    activeWallet: activeWallet,
    setactiveWallet: setactiveWallet,
    userWallets,
    userDetails,
  };
}
