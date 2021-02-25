import React, { useState, useContext, createContext, useEffect } from "react";
import { IWalletOperationProps } from "../types";

interface IWalletOperationsContextProps {
  walletOperation: IWalletOperationProps;
  setWalletOperation: any;
  hasValidData: boolean;
  setHasValidData: React.Dispatch<React.SetStateAction<boolean>>;
}

interface WalletOperationsContextProviderProps {
  children: any;
}

export const useWalletOperationsContexts = createContext<IWalletOperationsContextProps>(
  {} as IWalletOperationsContextProps
);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function WalletOperationsContextProvider({
  children,
}: WalletOperationsContextProviderProps) {
  const context = useWalletOperationsContextProviderProvider();
  return (
    <useWalletOperationsContexts.Provider value={context}>
      {children}
    </useWalletOperationsContexts.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useWalletOperationsContext = () => {
  return useContext(useWalletOperationsContexts);
};

// Provider hook that creates context object and handles state
function useWalletOperationsContextProviderProvider() {
  const [walletOperation, setWalletOperation] = useState<IWalletOperationProps>(
    {
      kind: "",
      processingStatus: "idle",
      processingError: "",
      processingValue: "",
      amount: 0,
      fee: 0,
      currency: "",
      referenceId: "",
      receivingAccount: {
        channel: "",
        channelProvider: "",
        accountName: "",
        accountNumber: "",
        swiftNumber: "",
        routingNumber: "",
      },
    }
  );
  const [hasValidData, setHasValidData] = useState<boolean>(false);
  //verifies operation details
  useEffect(() => {
    if (
      walletOperation.amount !== 0 &&
      walletOperation.receivingAccount.channelProvider !== ""
    ) {
      return setHasValidData(true);
    }
    return setHasValidData(false);
  }, [walletOperation]);

  // Returns modal context
  return {
    walletOperation,
    setWalletOperation,
    hasValidData,
    setHasValidData,
  };
}
