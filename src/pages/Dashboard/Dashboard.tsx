import React from "react";
import {
  TransactionsTableContainer,
  SendMoneyContainer,
  WalletBallanceContainer,
} from "../../containers";
import { ColumnsType } from "antd/lib/table";
import "./Dashboard.css";
import { Row, Col, Button } from "antd";
import { useAuthorisedContext } from "../../context/authorised-layout-context";
import { usePayoutContext } from "../../context/payout-context";

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
  const { userWallets } = useAuthorisedContext();
  const { payoutAmount } = usePayoutContext();

  const sendMoney = () => {
    console.log("eaf :>> ", payoutAmount);
    if (payoutAmount) {
      console.log("wew :>> ", payoutAmount);
    }
  };
  const addCurrency = () => {
    console.log("add currency");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="wallet-balance-wrapper">
        <WalletBallanceContainer addCurrency={addCurrency} />
      </div>

      <Row className="site-wrapper">
        <Col className="transaction-table-column" flex="auto">
          <TransactionsTableContainer columns={columns} transactions={data} />
        </Col>
        <Col className="send-money-column" flex="420px">
          <SendMoneyContainer userBalances={userWallets} />
          <Button type="primary" htmlType="submit" onClick={sendMoney}>
            Send
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
