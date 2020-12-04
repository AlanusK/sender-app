import React from "react";
import { Avatar, Card, Statistic } from "antd";
import { AuthorisedCurrencies } from "../../constants";

interface ICurrencyCard {
  amount: number;
  currency: "TZS" | "USD" | "GBP" | "KES" | "RWF";
}
function CurrencyCard(props: ICurrencyCard) {
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

export default CurrencyCard;
