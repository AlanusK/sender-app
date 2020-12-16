import React from "react";
import {
  DepositFormContainer,
  ExtendedWalletBallanceContainer,
  SelectCurrencyContainer,
  WalletBallanceContainer,
  TransactionsTableContainer,
  WithdrawalFormContainer,
  SendMoneyContainer,
  AllTransactionsTableContainer,
} from "../../containers";
import { ColumnsType } from "antd/lib/table";

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
      <div style={{ marginBottom: "100px" }}>
        <AllTransactionsTableContainer columns={columns} transactions={data} />
      </div>
      <TransactionsTableContainer columns={columns} transactions={data} />
      <div style={{ marginTop: "40px" }}>
        <WalletBallanceContainer />
      </div>
      <div style={{ marginTop: "40px" }}>
        <ExtendedWalletBallanceContainer />
      </div>
      <div style={{ marginTop: "40px" }}>
        <SelectCurrencyContainer />
      </div>
      <div style={{ marginTop: "80px" }}>
        <DepositFormContainer />
      </div>
      <div style={{ marginTop: "20px" }}>
        <WithdrawalFormContainer />
      </div>
      <div style={{ marginTop: "80px", width:400 }}>
        <SendMoneyContainer />
      </div>
    </div>
  );
};

export default Dashboard;
