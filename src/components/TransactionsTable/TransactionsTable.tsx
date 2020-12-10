import React from 'react';
import { Table } from 'antd';

interface ITransactionsTableProps {
  columns: any;
  transactions: any;
}

const TransactionsTable = (props:ITransactionsTableProps) => {
  return (
        <Table 
          columns={props.columns}
          dataSource={props.transactions}
          pagination={false}
          // scroll={{ y: 280}}
          size='small'
          bordered 
        />
  );
};
export default TransactionsTable;