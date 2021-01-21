import React from "react";
import { ExtendedWalletBallanceContainer } from "../../containers";
import { WalletBalance } from "../../types";
import "./Wallet.css";

const Wallet = () => {
  const sendMoney = () => {
    console.log("sending money");
  };
  const depositMoney = () => {
    console.log("depositin");
  };
  const withdrawalMoney = () => {
    console.log("withdrawaling");
  };

  const addCurrency = () => {
    console.log("add currency");
  };

  const allowedCurrencies: Array<WalletBalance> = [
    { currency: "TZS", amount: 3000, key: "1" },
    { currency: "USD", amount: 6000, key: "2" },
    { currency: "RWF", amount: 65000, key: "3" },
    { currency: "GBP", amount: 65000, key: "4" },
    { currency: "KES", amount: 65000, key: "5" },
  ];

  return (
    <>
      <h1> Wallet </h1>
      <hr className="wallet-line" />
      <ExtendedWalletBallanceContainer
        sendMoney={sendMoney}
        depositMoney={depositMoney}
        withdrawalMoney={withdrawalMoney}
        userBalances={allowedCurrencies}
        addCurrency={addCurrency}
      />
    </>
  );
};

export default Wallet;
