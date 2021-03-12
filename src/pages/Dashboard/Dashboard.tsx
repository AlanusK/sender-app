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
import useBreakpoint from "../../hooks/useBreakpoint";

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

  const data = userTransaction.slice(0, 4);

  const scroll = { y: null }

  const screens = useBreakpoint();

  return (
    <div className="dashboard-wrapper">
      <div className="wallet-balance-wrapper">
        <WalletBallanceContainer addCurrency={addCurrency} />
      </div>

      <div className="transaction-send-row">
        <div className="transactions-container">
          <div className="transaction-table-title">
            <div>
              Transactions
            </div>
            <div>
              {screens.xs ? <Button className="more-button">More</Button> : null}
            </div>
          </div>
          <div className="transactions-table-container">
            <TransactionsTableContainer columns={columns} transactions={data} scroll={scroll} />
          </div>
        </div>

        <div className="send-container" style={{ width: screens.xs ? "220px" : "435px" }} >
          <div className="send-title">
            Send
          </div>
          <div className="send-money-container">
            <SendMoneyContainer userBalances={userWallets} />
            <Button type="primary" htmlType="submit" onClick={sendMoney}>
              Send
            </Button>
          </div>
        </div>
      </div>

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
