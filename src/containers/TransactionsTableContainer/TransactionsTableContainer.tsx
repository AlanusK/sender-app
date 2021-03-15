import React from 'react';
import "./TransactionsTableContainer.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { TransactionsTable }  from '../../components';

interface ITransactionsTableProps {
  columns: any;
  transactions: any;
  scroll: any;
}

const TransactionsTableContainer = (props:ITransactionsTableProps) => {

  const screens = useBreakpoint();

  var columns = props.columns;

  if (screens.xs) {
    columns = props.columns.filter((col: any) => col.title === 'Date' || col.title === 'Amount');
  }

  return (
      <TransactionsTable 
        columns={columns}
        transactions={props.transactions}
        scroll={props.scroll}
      />
  );
};

export default TransactionsTableContainer;