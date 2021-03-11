import React, { useState, useContext, createContext, useEffect } from "react";
import { IWalletOperationProps } from "../types";

interface IWalletOperationsContextProps {
  walletOperation: IWalletOperationProps;
  setWalletOperation: any;
  hasValidOperationalData: boolean;
  setHasValidOperationalData: React.Dispatch<React.SetStateAction<boolean>>;
  resetWalletOperationsData(): void;
  requirePassword: boolean;
  setRequirePassword: React.Dispatch<React.SetStateAction<boolean>>;
  operationPassword: string;
  setOperationPassword: React.Dispatch<React.SetStateAction<string>>;
  operationAuthorized: boolean | undefined;
  setOperationAuthorized: React.Dispatch<React.SetStateAction<boolean | undefined>>;
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
  const resetWalletOperationsData = () =>
    setWalletOperation({
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
    });
  const [
    hasValidOperationalData,
    setHasValidOperationalData,
  ] = useState<boolean>(false);
  const [requirePassword, setRequirePassword] = useState<boolean>(false);
  const [operationPassword, setOperationPassword] = useState<string>("");
  const [operationAuthorized, setOperationAuthorized] = useState<boolean | undefined>();
  //verifies operation details
  useEffect(() => {
    if (
      walletOperation.receivingAccount.channel === "BANK TRANSFER" &&
      walletOperation.receivingAccount.swiftNumber === ""
    ) {
      return setHasValidOperationalData(false);
    }
    if (
      walletOperation.amount !== 0 &&
      walletOperation.receivingAccount.channelProvider !== "" &&
      walletOperation.receivingAccount.accountName !== "" &&
      walletOperation.receivingAccount.accountNumber !== "" &&
      walletOperation.receivingAccount.channel !== ""
    ) {
      return setHasValidOperationalData(true);
    }

    return setHasValidOperationalData(false);
  }, [walletOperation]);

  // Returns modal context
  return {
    walletOperation,
    setWalletOperation,
    hasValidOperationalData,
    setHasValidOperationalData,
    resetWalletOperationsData,
    requirePassword,
    setRequirePassword,
    operationPassword,
    setOperationPassword,
    operationAuthorized,
    setOperationAuthorized,
  };
}
