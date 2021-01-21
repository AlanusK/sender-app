import { Col, Row } from "antd";
import React from "react";
import { AddCurrencyCard, ExtendedCurrencyCard } from "../../components";
import { WalletBalance } from "../../types";


interface IExtendedWalletBalanceProps {
  sendMoney: () => void;
  depositMoney: () => void;
  withdrawalMoney: () => void;
  addCurrency: () => void;
  userBalances: Array<WalletBalance>;
}

function ExtendedWalletBallanceContainer(props: IExtendedWalletBalanceProps) {
  return (
    <>
      <Row gutter={[12, 12]}>
        {props.userBalances.map((item) => (
          <Col xs={24} md={8} lg={6} key={item.key}>
            <ExtendedCurrencyCard
              amount={item.amount}
              currency={item.currency}
              handleSendAction={props.sendMoney}
              handledeposit={props.depositMoney}
              handleWithdrawalAction={props.withdrawalMoney}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col span={24} md={8} lg={6}>
          <AddCurrencyCard handleAddCurrency={props.addCurrency} />
        </Col>
      </Row>
    </>
  );
}

export default ExtendedWalletBallanceContainer;
