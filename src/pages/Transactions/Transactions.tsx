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
        ...allTransactions?.deposits.map(
          (item: any) =>
            (item = {
              key: item.id,
              date: new Date(
                item.confirmation.confirmedAt
              ).toLocaleDateString(),
              amount: `${item.currency} ${toDecimalMark(
                Number(item.expected_amount)
              )}`,
              type: "Deposit",
              status: item.status,
            })
        ),
        ...allTransactions?.withdrawals.map(
          (item: any) =>
            (item = {
              key: item.id,
              date: new Date(item.createdAt).toLocaleDateString(),
              amount: `${item.currency} ${toDecimalMark(Number(item.amount))}`,
              type: "Withdraw",
              status: item.status,
            })
        ),
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
