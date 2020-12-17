import React from "react";
import {
  DepositFormContainer,
  ExtendedWalletBallanceContainer,
  SelectCurrencyContainer,
  WalletBallanceContainer,
  KycContainer,
  TransactionsTableContainer,
  WithdrawalFormContainer,
  SendMoneyContainer,
} from "../../containers";
import { ColumnsType } from "antd/lib/table";
import IndividualTransactionsContainer from "/home/alan/Codemaster/Clickpesa/sender-dashboard-v2/src/containers/IndividualTransactionsContainer/IndividualTransactionsContainer";

const data = [
  {
    key: "1",
    date: "04/11/1990",
    amount: "USD 10,000/=",
    type: "Deposit",
    status: "Completed",
  },
  {
    key: "2",
    date: "28/05/2020",
    amount: "USD 1,000/=",
    type: "Deposit",
    status: "Completed",
  },
  {
    key: "3",
    date: "17/11/2014",
    amount: "EUR 1,000/=",
    type: "Deposit",
    status: "Completed",
  },
  {
    key: "4",
    date: "13/09/2007",
    amount: "EUR 1,000/=",
    type: "Deposit",
    status: "Cancelled",
  },
];

type transactions = {
  key: string;
  date: string;
  amount: string;
  type: string;
  status: string;
};

const columns: ColumnsType<transactions> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    // align: 'center',
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "right",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    align: "left",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    // align: 'center',
  },
];

const Dashboard = () => {
  return (
    <div className="site-wrapper">
      <IndividualTransactionsContainer />
      <div style={{ marginTop: "40px" }}>
        <h1>Extensive KYC Form</h1>
        {/* <KycContainer /> */}
      </div>
      <div style={{ marginTop: "40px" }}>
        <h1>Transaction Table</h1>
        <TransactionsTableContainer columns={columns} transactions={data} />
      </div>
      <div style={{ marginTop: "40px" }}>
        <h1>Wallet Balance Cards</h1>
        <WalletBallanceContainer />
      </div>
      <div style={{ marginTop: "40px" }}>
        <h1> Extended Wallet Balance Cards </h1>
        <ExtendedWalletBallanceContainer />
      </div>
      <div style={{ marginTop: "40px" }}>
        <h1>Select Currency Components</h1>
        <SelectCurrencyContainer />
      </div>
      <div style={{ marginTop: "80px" }}>
        <h1>Deposit Form Container</h1>
        <DepositFormContainer />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h1>Withdrawal Form Container</h1>
        <WithdrawalFormContainer />
      </div>
      <div style={{ marginTop: "80px" }}>
        <h1>Send Money Form Container</h1>
        <SendMoneyContainer />
      </div>
    </div>
  );
};

export default Dashboard;
