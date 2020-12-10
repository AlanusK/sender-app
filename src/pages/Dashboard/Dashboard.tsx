import { Row } from "antd";
import React from "react";
import {
  DepositFormContainer,
  ExtendedWalletBallanceContainer,
  SelectCurrencyContainer,
  WalletBallanceContainer,
  WithdrawalFormContainer,
} from "../../containers";

const Dashboard = () => {
  return (
    <div className="site-wrapper">
      <WalletBallanceContainer />
      <ExtendedWalletBallanceContainer />
      <Row style={{ marginTop: "40px" }}>
        <SelectCurrencyContainer />
      </Row>
      <Row style={{ marginTop: "80px" }}>
        <DepositFormContainer />
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <WithdrawalFormContainer />
      </Row>
    </div>
  );
};

export default Dashboard;
