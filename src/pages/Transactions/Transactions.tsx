import React from "react";
import { AllTransactionsTableContainer } from "../../containers";
import { ColumnsType } from "antd/lib/table";
import { useAuthorisedContext } from "../../context/authorised-user-context";

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

const Transactions = () => {

  const { userTransaction } = useAuthorisedContext();

  const data = userTransaction;

  const scroll = { y:415 };

  return (
    <div>
      <AllTransactionsTableContainer columns={columns} transactions={data} scroll={scroll} />
    </div>
  );
};

export default Transactions;
