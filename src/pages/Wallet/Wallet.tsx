import React from "react";
import { ExtendedWalletBallanceContainer } from "../../containers";
import "./Wallet.css";

const Wallet = () => {

  return (
    <>
      <h1> Wallet </h1>
      <hr className="wallet-line" />
      <ExtendedWalletBallanceContainer />
    </>
  );
};

export default Wallet;
