import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import "./AllTransactionsTableContainer.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { TransactionsTable } from "../../components";
import { IndividualTransactionsProps } from "../../types";

interface IAllTransactionsTableProps {
  columns: any;
  // transactions: any;
  scroll: any;
  transactions: IndividualTransactionsProps[];
}

const AllTransactionsTableContainer = (props: IAllTransactionsTableProps) => {
  const screens = useBreakpoint();

  var columns = props.columns;
  const [transactions, setTransactions] = useState<
    IndividualTransactionsProps[]
  >([{ date: "", amount: "", status: "", meta: {}, type: "", key: "" }]);

  if (screens.xs) {
    columns = props.columns.filter(
      (col: any) => col.title === "Date" || col.title === "Amount"
    );
  }

  useEffect(() => {
    setTransactions(props.transactions);
  }, [props.transactions]);

  return (
    <>
      <div className="title-all-transactions">
        <Button
          className="button transaction-type" 
          type="default"
          onClick={() => setTransactions(props.transactions)}
        >
          All Payments
        </Button>
        <Button
          className="button transaction-type" 
          type="default"
          onClick={() =>
            setTransactions(
              props.transactions.filter((obj: any) => obj.type === "Send")
            )
          }
        >
          Transfers
        </Button>
        <Button
          className="button transaction-type" 
          type="default"
          onClick={() =>
            setTransactions(
              props.transactions.filter((obj: any) => obj.type === "Withdraw")
            )
          }
        >
          Withdrawals
        </Button>
        <Button
          className="button transaction-type" 
          type="default"
          onClick={() =>
            setTransactions(
              props.transactions.filter((obj: any) => obj.type === "Deposit")
            )
          }
        >
          Deposits
        </Button>
      </div>
      <div className="search-input">
        <Input
          placeholder="Search"
          style={{ width: screens.xs ? "200px" : "450px", height: "38px" }}
          onChange={(e) => {
            console.log(e.target.value);
            const trans = props.transactions.filter(
              (row: any) =>
                row.date.toLowerCase().includes(e.target.value.toLowerCase()) ||
                row.amount
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                row.type.toLowerCase().includes(e.target.value.toLowerCase()) ||
                row.status.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setTransactions(trans);
          }}
        />
      </div>
      <div className="transactions-table">
        <TransactionsTable
          columns={columns}
          transactions={transactions}
          scroll={props.scroll}
        />
      </div>
    </>
  );
};

export default AllTransactionsTableContainer;
