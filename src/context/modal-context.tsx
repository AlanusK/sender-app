import React, { useState, useContext, createContext } from "react";

type DataType = {
  dataType:
    | "SEND_MONEY_INSTRUCTIONS"
    | "WITHDRAWAL_INSTRUCTIONS"
    | "DEPOSIT_INSTRUCTIONS"
    | null;
  data: {};
};
interface ModalContextProps {
  setmodalContext: React.Dispatch<React.SetStateAction<DataType>>;
  modalContext: DataType;
  hasValidData: boolean;
  sethasValidData: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalContextProviderProps {
  children: any;
}

export const useModalContexts = createContext<ModalContextProps>(
  {} as ModalContextProps
);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const context = useModalContextProviderProvider();
  return (
    <useModalContexts.Provider value={context}>
      {children}
    </useModalContexts.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useModalContext = () => {
  return useContext(useModalContexts);
};

// Provider hook that creates context object and handles state
function useModalContextProviderProvider() {
  const [modalContext, setmodalContext] = useState<DataType>({
    dataType: null,
    data: {},
  });
  const [hasValidData, sethasValidData] = useState<boolean>(false);
  // Returns modal context
  return {
    hasValidData: hasValidData,
    sethasValidData: sethasValidData,
    setmodalContext: setmodalContext,
    modalContext: modalContext,
  };
}
