import React from "react";
import { supportedCurrencies } from "../../constants";
import { DepositIcon, SendMoneyIcon, WithdrawalIcon } from "..";
import { Card, Statistic } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useAuthorisedContext } from "../../context/authorised-user-context";

interface IExtendedCurrencyCard {
  amount: number;
  currency: "TZS" | "USD" | "GBP" | "KES" | "RWF";
  handleSendAction(): any;
  handledeposit(): any;
  handleWithdrawalAction(): any;
}
function ExtendedCurrencyCard({
  amount,
  currency,
  handleSendAction,
  handleWithdrawalAction,
  handledeposit,
}: IExtendedCurrencyCard) {
  const { setactiveWallet } = useAuthorisedContext();
  const initiateSendMoney = () => {
    setactiveWallet({
      currency: currency,
      balance: amount,
    });
    handleSendAction();
  };
  const intitiateWithdrawal = () => {
    setactiveWallet({
      currency: currency,
      balance: amount,
    });
    handleWithdrawalAction();
  };
  const initiateDeposit = () => {
    setactiveWallet({
      currency: currency,
      balance: amount,
    });
    handledeposit();
  };
  return (
    <Card
      title={currency}
      bordered={true}
      hoverable={false}
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
      actions={[
        <div onClick={initiateDeposit}>
          <DepositIcon key="deposit" size={20} />
          <p>Deposit</p>
        </div>,
        <div onClick={intitiateWithdrawal}>
          <WithdrawalIcon key="withdrawal" size={20} />
          <p>Withdrawal</p>
        </div>,
        <div onClick={initiateSendMoney}>
          <SendMoneyIcon key="send" size={20} />
          <p>Send</p>
        </div>,
      ]}
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

export default ExtendedCurrencyCard;
