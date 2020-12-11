import React from "react";
import {
  ExtendedWalletBallanceContainer,
  WalletBallanceContainer,
  KycContainer,
} from "../../containers";

const Dashboard = () => {
  return (
    <div className="site-wrapper">
      {/* <WalletBallanceContainer />
      <ExtendedWalletBallanceContainer /> */}
      <KycContainer/>
    </div>
  );
};

export default Dashboard;
