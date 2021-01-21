import React from "react";
import { ExtendedWalletBallanceContainer } from "../../containers";
import "./Wallet.css";

const Wallet = () => {

  return (
    <>
      <h1 className="wallet-title"> Wallet </h1>
      <ExtendedWalletBallanceContainer />
    </>
  );
};

export default Wallet;
