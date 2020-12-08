import React from "react";
import WalletBallanceContainer from "../../containers/WalletBallanceContainer/WalletBallanceContainer";
import SenderContainer from "../../containers/SenderContainer/SenderContainer";

const Dashboard = () => {
  return (
    <div className="site-wrapper">
      {/* <WalletBallanceContainer /> */}
      <SenderContainer />
    </div>
  );
};

export default Dashboard;
