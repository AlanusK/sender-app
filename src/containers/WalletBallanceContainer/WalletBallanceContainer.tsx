import { Col, Row } from "antd";
import React from "react";
import { AddCurrencyCard, CurrencyCard } from "../../components";
import { useAuthorisedContext } from "../../context/authorised-user-context";

interface IWalletBallanceContainerProps {
  addCurrency: () => void;
}

function WalletBallanceContainer({
  addCurrency,
}: IWalletBallanceContainerProps) {
  const { setactiveWallet, userWallets } = useAuthorisedContext();

  return (
    <Row gutter={[12, 12]}>
      {userWallets.map((item) => (
        <Col xs={24} md={8} lg={6} key={item.currency}>
          <CurrencyCard
            amount={item.amount}
            currency={item.currency}
            handleCardClick={() =>
              setactiveWallet({
                currency: item.currency,
                balance: item.amount,
              })
            }
          />
        </Col>
      ))}
      <Col span={24} md={8} lg={6}>
        <AddCurrencyCard handleAddCurrency={addCurrency} />
      </Col>
    </Row>
  );
}

export default WalletBallanceContainer;
