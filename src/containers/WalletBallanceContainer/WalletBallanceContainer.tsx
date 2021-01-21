import { Col, Row } from "antd";
import React from "react";
import { AddCurrencyCard, CurrencyCard } from "../../components";
import { WalletBalance } from "../../types";

function WalletBallanceContainer() {
  const allowedCurrencies: Array<WalletBalance> = [
    { currency: "TZS", amount: 3000, key: "1" },
    { currency: "USD", amount: 6000, key: "2" },
    { currency: "RWF", amount: 65000, key: "3" },
  ];

  const setActiveCurrency = () => {
    console.log("set active currency");
  };

  const addCurrency = () => {
    console.log("add currency");
  }


  return (
    <Row gutter={[12, 12]}>
      {allowedCurrencies.map((item) => (
        <Col xs={24} md={8} lg={6} key={item.key}>
          <CurrencyCard
            amount={item.amount}
            currency={item.currency}
            handleCardClick={setActiveCurrency}
          />
        </Col>
      ))}
      <Col span={24} md={8} lg={6}>
        <AddCurrencyCard handleAddCurrency={addCurrency}/>
      </Col>
    </Row>
  );
}

export default WalletBallanceContainer;
