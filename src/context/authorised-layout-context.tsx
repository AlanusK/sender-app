import jwtDecode from "jwt-decode";
import React, { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../hooks/useRouter";
import {
  ExtendedJwtPayload,
  IUserData,
  StellarWalletBalanceProps,
  userWalletsBalanceProps,
} from "../types";
const Axios = require("axios").default;
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
  const { replace } = useRouter();
  const { setAuthentication } = useAuth();
  const decodedToken = jwtDecode<ExtendedJwtPayload>(
    localStorage.getItem("userSessionToken") || ""
  );
  const [userDetails, setUserDetails] = useState<IUserData>({
    name: "",
    email: "",
    phone: "",
    language: "",
    stellar_address: "",
    secret_key: "",
    public_key: "",
    address: "",
    currency: "",
    userWallets: [
      { amount: 0, currency: "TZS" },
      { amount: 0, currency: "KES" },
    ],
    userId: decodedToken.id,
  });

  useEffect(() => {
    if (decodedToken.id) {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/accounts/?registration_id=${decodedToken.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("userSessionToken"),
          },
        }
      )
        .then((response: any) => {
          setUserDetails((existingUserDetails) => ({
            ...existingUserDetails,
            userWallets: response.data.balances
              .filter(
                (balance: StellarWalletBalanceProps) =>
                  balance.asset_type !== "native" &&
                  (balance.asset_code === "TZS" || balance.asset_code === "KES")
              )
              .map((balance: StellarWalletBalanceProps) => ({
                amount: balance.balance,
                currency: balance.asset_code,
              })),
            stellar_address: response.data.account_address,
            secret_key: response.data.secret,
            public_key: response.data.publicKey,
          }));
        })
        .catch((error: any) => {
          const errorMessage = error?.toString().includes("401")
            ? "User has no API access"
            : "Something is wrong";
          console.log("Error :>> ", errorMessage);
          setAuthentication(false);
          localStorage.removeItem("userSessionToken")
          return replace("/login")
        });
    }

    Axios.get(`${process.env.REACT_APP_API_URL}/customer/${decodedToken.id}`)
      .then((response: any) => {
        console.log(response.data)
        const data = response.data;
        setUserDetails((existingUserDetails) => ({
          ...existingUserDetails, 
          name: data.full_name,
          email: data.email,
          phone: data.phone,
          language: data.nationality,
        }))
      })
      .catch ((error: any) => console.log(error))
      
  }, [decodedToken.id, replace, setAuthentication]);

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

  // Returns auth methods
  return {
    siderCollapsed: collapsed,
    toggleSider,
    selectedMenuItem: selectedMenuItem,
    setMenuItem,
    activeWallet: activeWallet,
    setactiveWallet: setactiveWallet,
    userWallets: userDetails.userWallets,
    userDetails,
    setUserDetails,
  };
}
