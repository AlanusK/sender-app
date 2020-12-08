import React from "react";
import { Avatar, Card, Statistic, Tooltip } from "antd";
import { AuthorisedCurrencies } from "../../constants";
import { DepositIcon, SendMoneyIcon, WithdrawalIcon } from "..";

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
        <p onClick={props.handledeposit}>
          <DepositIcon key="deposit" size={24} />
          <p>Deposit</p>
        </p>,
        <p onClick={props.handleWithdrawalAction}>
          <WithdrawalIcon key="withdrawal" size={24} />
          <p>Withdrawal</p>
        </p>,
        <p onClick={props.handleSendAction}>
          <SendMoneyIcon key="send" size={24} />
          <p>Send</p>
        </p>,
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
