import React, { useState } from 'react';
import { Button, Input } from 'antd';
import "./AllTransactionsTableContainer.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { TransactionsTable } from '../../components';

interface IAllTransactionsTableProps {
  columns: any;
  transactions: any;
}

const AllTransactionsTableContainer = (props: IAllTransactionsTableProps) => {

  const screens = useBreakpoint();

  var columns = props.columns;
  const [transactions, setTransactions] = useState(props.transactions);

  if (screens.xs) {
    columns = props.columns.filter((col: any) => col.title === 'Date' || col.title === 'Amount');
  }

  return (
    <>
      <div className="title-all-transactions">
        <Button className="transaction-type" type="text" onClick={() => setTransactions(props.transactions)}>All Payments</Button>
        <Button className="transaction-type" type="text" onClick={() => setTransactions(props.transactions.filter((obj: any) => obj.type === 'Send'))}>Send</Button>
        <Button className="transaction-type" type="text" onClick={() => setTransactions(props.transactions.filter((obj: any) => obj.type === 'Withdraw'))}>Withdraw</Button>
        <Button className="transaction-type" type="text" onClick={() => setTransactions(props.transactions.filter((obj: any) => obj.type === 'Deposit'))}>Deposit</Button>
      </div>
      <div className="search-input">
        <Input
          placeholder='Search'
          style={{ width: screens.xs ? "200px" : "450px", height: "38px" }}
          onChange={(e) => {
            console.log(e.target.value)
            const trans = props.transactions.filter((row: any) => {
              if (row.date.toLowerCase().includes(e.target.value.toLowerCase()) ||
                row.amount.toLowerCase().includes(e.target.value.toLowerCase()) ||
                row.type.toLowerCase().includes(e.target.value.toLowerCase()) ||
                row.status.toLowerCase().includes(e.target.value.toLowerCase())
              )
                return row
            })
            console.log(trans)
            setTransactions(trans)
          }}
        />
      </div>
      <div className="transactions-table">
        <TransactionsTable
          columns={columns}
          transactions={transactions}
        />
      </div>
    </>
  );
};

export default AllTransactionsTableContainer;