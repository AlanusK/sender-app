import React from "react";
import {
  ExtendedWalletBallanceContainer,
  WalletBallanceContainer,
} from "../../containers";

const Dashboard = () => {
  return (
    <div className="site-wrapper">
      <WalletBallanceContainer />
      <ExtendedWalletBallanceContainer />
    </div>
  );
};

export default Dashboard;
