import React, { useEffect, useState } from "react";
import { AllTransactionsTableContainer } from "../../containers";
import { ColumnsType } from "antd/lib/table";
import { toDecimalMark } from "../../utility";
import { Tag } from "antd";
import { useTransactionsContext } from "../../context/transactions-context";

interface IAllTransactionTableProps {
  key: string;
  date: string;
  amount: string;
  type: string;
  status: string;
}

const columns: ColumnsType<IAllTransactionTableProps> = [
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
      if (status === "FAILED") {
        color = "red";
      }
      if (status === "UNAUTHORIZED") {
        color = "red";
      }
      if (status === "SUCCESS") {
        color = "green";
      }
      return (
        <span>
          <Tag color={color} key={status}>
            {status}
          </Tag>
        </span>
      );
    },
  },
];

const Transactions = () => {
  const [tableTransactions, setTableTransactions] = useState<any>();
  const { allTransactions, reloadTransactions } = useTransactionsContext();

  useEffect(() => {
    reloadTransactions();
  }, []);

  useEffect(() => {
    if (allTransactions) {
      setTableTransactions([
        ...allTransactions?.deposits.map((item: any) => {
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
        ...allTransactions?.withdrawals.map((item: any) => {
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

  return (
    <div>
      <AllTransactionsTableContainer
        columns={columns}
        transactions={tableTransactions}
      />
    </div>
  );
};

export default Transactions;
