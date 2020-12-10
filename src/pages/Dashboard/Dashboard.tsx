import { Row } from "antd";
import React from "react";
import {
  ExtendedWalletBallanceContainer,
  SelectCurrencyContainer,
  WalletBallanceContainer,
} from "../../containers";

const Dashboard = () => {
  return (
    <div className="site-wrapper">
      <WalletBallanceContainer />
      <ExtendedWalletBallanceContainer />
      <Row style={{marginTop:"20px"}}>
        <SelectCurrencyContainer />
      </Row>
    </div>
  );
};

export default Dashboard;
