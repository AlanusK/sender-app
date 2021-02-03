import React, { useState, useContext, createContext } from "react";

interface IPayoutContextProps {
  payoutAmount: number;
  SetPayoutAmount: React.Dispatch<React.SetStateAction<number>>;
  payoutFee: number;
  SetFeeAmount: React.Dispatch<React.SetStateAction<number>>;
  payoutCurrency: any;
  SetPayoutCurrency: React.Dispatch<React.SetStateAction<any>>;
  payoutChannel: string;
  SetPayoutChannel: React.Dispatch<React.SetStateAction<string>>;
  payoutAccountDetails: any;
  SetPayoutAccountDetails: React.Dispatch<React.SetStateAction<any>>;
}

interface PayoutContextProviderProps {
  children: any;
}

export const usePayoutContexts = createContext<IPayoutContextProps>(
  {} as IPayoutContextProps
);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function PayoutContextProvider({
  children,
}: PayoutContextProviderProps) {
  const context = usePayoutContextProviderProvider();
  return (
    <usePayoutContexts.Provider value={context}>
      {children}
    </usePayoutContexts.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const usePayoutContext = () => {
  return useContext(usePayoutContexts);
};

// Provider hook that creates context object and handles state
function usePayoutContextProviderProvider() {
  const [amount, setamount] = useState(0);
  const [feeAmount, setfeeAmount] = useState(0);
  const [payoutCurrency, setpayoutCurrency] = useState("");
  const [payoutChannel, setpayoutChannel] = useState("");
  const [payoutAccountDetails, setpayoutAccountDetails] = useState({});
  // Returns modal context
  return {
    payoutAmount: amount,
    SetPayoutAmount: setamount,
    payoutFee: feeAmount,
    SetFeeAmount: setfeeAmount,
    payoutCurrency: payoutCurrency,
    SetPayoutCurrency: setpayoutCurrency,
    payoutChannel: payoutChannel,
    SetPayoutChannel: setpayoutChannel,
    payoutAccountDetails: payoutAccountDetails,
    SetPayoutAccountDetails: setpayoutAccountDetails,
  };
}
