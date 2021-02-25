import React, { useEffect, useState } from "react";
import {
  TransactionsTableContainer,
  SendMoneyContainer,
  WalletBallanceContainer,
  SelectCurrencyContainer,
} from "../../containers";
import { ColumnsType } from "antd/lib/table";
import "./Dashboard.css";
import { Row, Col, Button, Modal } from "antd";
import { useAuthorisedContext } from "../../context/authorised-user-context";
import { useWalletOperationsContext } from "../../context/wallet-operations-context";

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
  const { userWallets, updateWalletBalances } = useAuthorisedContext();
  const {
    walletOperation,
  } = useWalletOperationsContext();
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  useEffect(() => {
    updateWalletBalances();
  }, []);

  const sendMoney = () => {
    console.log("amount :>> ", walletOperation.amount);
    console.log('walletOperation :>> ', walletOperation);
  };
  const addCurrency = () => {
    console.log("add currency");
    setShowCurrencyModal(true);
  };

  const currencyAdd = () => {
    console.log("currency add on Dashboard page");
  };

  const handleCancel = () => {
    setShowCurrencyModal(false);
  };

  const { userTransaction } = useAuthorisedContext();

  const data = userTransaction;

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

      <Modal
        title="Add Currency"
        visible={showCurrencyModal}
        onOk={currencyAdd}
        onCancel={handleCancel}
        okText="Add"
        wrapClassName="add-currency-modal"
      >
        <SelectCurrencyContainer
          currencyOptions={[{ currency: "TZS" }]}
          width={412}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
