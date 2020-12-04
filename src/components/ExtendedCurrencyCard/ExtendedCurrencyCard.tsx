import React from "react";
import { Avatar, Card, Statistic, Tooltip } from "antd";
import { AuthorisedCurrencies } from "../../constants";
import { DepositIcon, SendMoneyIcon, WithdrawalIcon } from "..";

interface IExtendedCurrencyCard {
  amount: number;
  currency: "TZS" | "USD" | "GBP" | "KES" | "RWF";
  handleSendCaAction(): any;
  handleDepositCaAction(): any;
  handleWithdrawalCaAction(): any;
}
function ExtendedCurrencyCard(props: IExtendedCurrencyCard) {
  return (
    <Card
      title={props.currency}
      bordered={true}
      hoverable={true}
      extra={
        <Avatar
          shape="circle"
          size={36}
          src={AuthorisedCurrencies[props.currency].icon}
        />
      }
      actions={[
        <>
          <Tooltip title="Deposit">
            <DepositIcon
              key="deposit"
              size={24}
              handleCardAction={props.handleDepositCaAction}
            />
          </Tooltip>
        </>,
        <>
          <Tooltip title="Withdrawal">
            <WithdrawalIcon
              key="withdrawal"
              size={24}
              handleCardAction={props.handleWithdrawalCaAction}
            />
          </Tooltip>
        </>,
        <>
          <Tooltip title="Send Money">
            <SendMoneyIcon
              key="send"
              size={24}
              handleCardAction={props.handleSendCaAction}
            />
          </Tooltip>
        </>,
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
