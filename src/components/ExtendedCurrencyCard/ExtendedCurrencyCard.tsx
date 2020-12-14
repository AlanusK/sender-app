import React from "react";
import { AuthorisedCurrencies } from "../../constants";
import { DepositIcon, SendMoneyIcon, WithdrawalIcon } from "..";
import { Card, Statistic } from "antd";
import Avatar from "antd/lib/avatar/avatar";

interface IExtendedCurrencyCard {
  amount: number;
  currency: "TZS" | "USD" | "GBP" | "KES" | "RWF";
  handleSendAction(): any;
  handledeposit(): any;
  handleWithdrawalAction(): any;
}
function ExtendedCurrencyCard(props: IExtendedCurrencyCard) {
  return (
    <Card
      title={props.currency}
      bordered={true}
      hoverable={false}
      extra={
        <Avatar
          shape="circle"
          size={36}
          src={AuthorisedCurrencies[props.currency].icon}
        />
      }
      actions={[
        <div onClick={props.handledeposit}>
          <DepositIcon key="deposit" size={20} />
          <p>Deposit</p>
        </div>,
        <div onClick={props.handleWithdrawalAction}>
          <WithdrawalIcon key="withdrawal" size={20} />
          <p>Withdrawal</p>
        </div>,
        <div onClick={props.handleSendAction}>
          <SendMoneyIcon key="send" size={20} />
          <p>Send</p>
        </div>,
      ]}
    >
      <Statistic
        title={AuthorisedCurrencies[props.currency].symbol}
        value={props.amount}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix={""}
        suffix=""
        style={{ textAlign: "right" }}
      />
    </Card>
  );
}

export default ExtendedCurrencyCard;
