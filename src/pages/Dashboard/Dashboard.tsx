import React from "react";
import {
  ExtendedWalletBallanceContainer,
  WalletBallanceContainer,
  TransactionsTableContainer,
} from "../../containers";

const Dashboard = () => {
  return (
    <div className="site-wrapper">
      {/* <WalletBallanceContainer />
      <ExtendedWalletBallanceContainer /> */}
      <TransactionsTableContainer />
    </div>
  );
};

export default Dashboard;
