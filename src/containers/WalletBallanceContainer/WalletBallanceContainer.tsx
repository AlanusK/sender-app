import { Col, Row } from "antd";
import React from "react";
import { CurrencyCard, ExtendedCurrencyCard } from "../../components";

function WalletBallanceContainer() {
  const sendMoney = () => {
    console.log("sending money");
  };
  const depositMoney = () => {
    console.log("depositin");
  };
  const withdrawalMoney = () => {
    console.log("withdrawaling");
  };
  return (
    <Row gutter={[12, 12]}>
      <Col xs={24} md={8} lg={6}>
        <CurrencyCard amount={2000} currency={"RWF"} />
      </Col>
      <Col span={24} md={8} lg={6}>
        <ExtendedCurrencyCard
          amount={3000}
          currency={"KES"}
          handleSendCaAction={sendMoney}
          handleDepositCaAction={depositMoney}
          handleWithdrawalCaAction={withdrawalMoney}
        />
      </Col>
    </Row>
  );
}

export default WalletBallanceContainer;
