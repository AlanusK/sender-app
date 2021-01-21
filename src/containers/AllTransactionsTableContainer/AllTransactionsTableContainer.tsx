import React from 'react';
import { Button, Input } from 'antd';
import "./AllTransactionsTableContainer.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { TransactionsTable }  from '../../components';

interface IAllTransactionsTableProps {
  columns: any;
  transactions: any;
}

const AllTransactionsTableContainer = (props:IAllTransactionsTableProps) => {

  const screens = useBreakpoint();

  var columns = props.columns;

  if (screens.xs) {
    columns = props.columns.filter((col: any) => col.title === 'Date' || col.title === 'Amount');
  }

  return (
    <>
      <div className="title-all-transactions">
        <Button className="transaction-type" type="text">All Payments</Button>
        <Button className="transaction-type" type="text">Send</Button>
        <Button className="transaction-type" type="text">Withdraw</Button>
        <Button className="transaction-type" type="text">Deposit</Button>
      </div>
      <div className="search-input">
        <Input 
          placeholder='Search' 
          style={{width: screens.xs ? "200px" : "450px", height: "38px"}}
        />
      </div>
      <div className="transactions-table">
        <TransactionsTable 
          columns={columns}
          transactions={props.transactions}
        /> 
      </div>
    </>
  );
};

export default AllTransactionsTableContainer;  