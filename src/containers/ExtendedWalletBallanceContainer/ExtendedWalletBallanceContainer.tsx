import { Col, Row } from "antd";
import React from "react";
import { AddCurrencyCard, ExtendedCurrencyCard } from "../../components";

interface ICurrency {
  amount: number;
  currency: "TZS" | "USD" | "GBP" | "KES" | "RWF";
  key: string;
}

function ExtendedWalletBallanceContainer() {
  const sendMoney = () => {
    console.log("sending money");
  };
  const depositMoney = () => {
    console.log("depositin");
  };
  const withdrawalMoney = () => {
    console.log("withdrawaling");
  };

  const allowedCurrencies: Array<ICurrency> = [
    { currency: "TZS", amount: 3000, key: "1" },
    { currency: "USD", amount: 6000, key: "2" },
    { currency: "RWF", amount: 65000, key: "3" },
  ];
  return (
    <>
      <Row gutter={[12, 12]}>
        {allowedCurrencies.map((item) => (
          <Col xs={24} md={8} lg={6} key={item.key}>
            <ExtendedCurrencyCard
              amount={item.amount}
              currency={item.currency}
              handleSendAction={sendMoney}
              handledeposit={depositMoney}
              handleWithdrawalAction={withdrawalMoney}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col span={24} md={8} lg={6}>
          <AddCurrencyCard />
        </Col>
      </Row>
    </>
  );
}

export default ExtendedWalletBallanceContainer;
