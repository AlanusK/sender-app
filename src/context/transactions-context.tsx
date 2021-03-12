import React, { useState, useContext, createContext, useEffect } from "react";
import { GetUserDepositsTransactions } from "../services/DepositService";
import { GetUserWithdrawalTransactions } from "../services/WithdrawalService";
import { useAuthorisedContext } from "./authorised-user-context";

interface ITransactionsContextProps {
  allTransactions: any;
  depositTransactions: any;
  withdrawalTransaction: any;
  reloadTransactions(): void;
}

interface TransactionsContextProviderProps {
  children: any;
}

export const useTransactionsContexts = createContext<ITransactionsContextProps>(
  {} as ITransactionsContextProps
);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const context = useTransactionsContextProviderProvider();
  return (
    <useTransactionsContexts.Provider value={context}>
      {children}
    </useTransactionsContexts.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useTransactionsContext = () => {
  return useContext(useTransactionsContexts);
};

// Provider hook that creates context object and handles state
function useTransactionsContextProviderProvider() {
  const { userDetails } = useAuthorisedContext();
  const [allTransactions, setAllTransactions] = useState<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserTransactions = async () => {
    const deposits = await GetUserDepositsTransactions(userDetails.userId);
    const withdrawals = await GetUserWithdrawalTransactions(userDetails.userId);
    if (deposits && withdrawals) {
      setAllTransactions({
        deposits: new Array(...deposits),
        withdrawals: new Array(...withdrawals),
      });
    }
  };
  const reloadTransactions = () => getUserTransactions();
  useEffect(() => {
    getUserTransactions();
  }, []);

  // Returns modal context
  return {
    allTransactions,
    depositTransactions: allTransactions?.deposits,
    withdrawalTransaction: allTransactions?.withdrawals,
    reloadTransactions,
  };
}
