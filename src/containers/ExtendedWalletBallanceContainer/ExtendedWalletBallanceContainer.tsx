import { Col, Row } from "antd";
import React from "react";
import { AddCurrencyCard, ExtendedCurrencyCard } from "../../components";
import { userWalletsBalanceProps } from "../../types";

interface IExtendedWalletBalanceProps {
  sendMoney: () => any;
  depositMoney: () => void;
  withdrawalMoney: () => void;
  addCurrency: () => void;
  userBalances: Array<userWalletsBalanceProps>;
}

function ExtendedWalletBallanceContainer({
  userBalances,
  sendMoney,
  withdrawalMoney,
  addCurrency,
  depositMoney,
}: IExtendedWalletBalanceProps) {
  return (
    <>
      <Row gutter={[12, 12]}>
        {userBalances.map((item) => (
          <Col xs={24} md={8} lg={6} key={item.currency}>
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
          <AddCurrencyCard handleAddCurrency={addCurrency} />
        </Col>
      </Row>
    </>
  );
}

export default ExtendedWalletBallanceContainer;
