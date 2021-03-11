import React, { useEffect, useState } from "react";
import {
  TransactionsTableContainer,
  SendMoneyContainer,
  WalletBallanceContainer,
  SelectCurrencyContainer,
} from "../../containers";
import { ColumnsType } from "antd/lib/table";
import "./Dashboard.css";
import { Row, Col, Button, Modal, Tag } from "antd";
import { useAuthorisedContext } from "../../context/authorised-user-context";
import { useWalletOperationsContext } from "../../context/wallet-operations-context";
import { toDecimalMark } from "../../utility";
import { useTransactionsContext } from "../../context/transactions-context";

interface IPendingTransactionTableProps {
  key: string;
  date: string;
  amount: string;
  type: string;
  status: string;
}

const columns: ColumnsType<IPendingTransactionTableProps> = [
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
    render: (status: any) => {
      let color = "volcano";
      if (status === "PENDING") {
        color = "gray";
      }
      if (status === "UNAUTHORIZED") {
        color = "red";
      }
      return (
        <span>
          <Tag color={color} key={status}>
            {status}
          </Tag>
        </span>
      );
    },
    // align: 'center',
  },
];
const Dashboard = () => {
  const { userWallets, updateWalletBalances } = useAuthorisedContext();
  const { allTransactions, reloadTransactions } = useTransactionsContext();
  const { walletOperation } = useWalletOperationsContext();
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [pendingTransactions, setPendingTransactions] = useState<any>();

  useEffect(() => {
    updateWalletBalances();
    reloadTransactions();
  }, []);

  useEffect(() => {
    if (allTransactions) {
      setPendingTransactions([
        ...allTransactions?.deposits
          .filter((deposit: any) => deposit.status === "PENDING")
          .map((item: any) => {
            const {
              id,
              updatedAt,
              expected_amount,
              currency,
              status,
              ...rest
            } = item;
            return (item = {
              key: id,
              date: new Date(updatedAt).toLocaleDateString(),
              amount: `${currency} ${toDecimalMark(Number(expected_amount))}`,
              type: "Deposit",
              status: status,
              meta: rest,
            });
          }),
        ...allTransactions?.withdrawals
          .filter((withdrwal: any) => withdrwal.status === "PROCESSING" || withdrwal.status === "UNAUTHORIZED")
          .map((item: any) => {
            const { id, updatedAt, amount, currency, status, ...rest } = item;
            return (item = {
              key: id,
              date: new Date(updatedAt).toLocaleDateString(),
              amount: `${currency} ${toDecimalMark(Number(amount))}`,
              type: "Withdraw",
              status: status,
              meta: rest,
            });
          }),
      ]);
    }
  }, [allTransactions]);

  const sendMoney = () => {
    console.log("amount :>> ", walletOperation.amount);
    console.log("walletOperation :>> ", walletOperation);
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

  return (
    <div className="dashboard-wrapper">
      <div className="wallet-balance-wrapper">
        <WalletBallanceContainer addCurrency={addCurrency} />
      </div>

      <Row className="site-wrapper">
        <Col className="transaction-table-column" flex="auto">
          <TransactionsTableContainer
            columns={columns}
            transactions={pendingTransactions}
          />
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
