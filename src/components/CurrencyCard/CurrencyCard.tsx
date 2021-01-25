import React from "react";
import { Avatar, Card, Statistic } from "antd";
import { supportedCurrencies } from "../../constants";

interface ICurrencyCard {
  amount: number;
  currency: "TZS" | "USD" | "GBP" | "KES" | "RWF";
  handleCardClick?(): any;
}
function CurrencyCard({ amount, currency, handleCardClick }: ICurrencyCard) {
  return (
    <Card
      title={currency}
      bordered={true}
      hoverable={true}
      extra={
        <Avatar
          shape="circle"
          size={36}
          src={
            supportedCurrencies.filter((curr) => curr.currency === currency)[0]
              .icon
          }
        />
      }
      onClick={handleCardClick}
    >
      <Statistic
        title={
          supportedCurrencies.filter((curr) => curr.currency === currency)[0]
            .symbol
        }
        value={amount}
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
