import React from 'react';
import { Table, Button  } from 'antd';
import "./TransactionsTableContainer.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { ColumnsType } from 'antd/lib/table';

const data = [
  {
    key: '1',
    date: '04/11/1990',
    amount: 'USD 10,000/=',
    type: 'Deposit',
    status: 'Completed',
  },
  {
    key: '2',
    date: '28/05/2020',
    amount: 'USD 1,000/=',
    type: 'Deposit',
    status: 'Completed',
  },
  {
    key: '3',
    date: '17/11/2014',
    amount: 'EUR 1,000/=',
    type: 'Deposit',
    status: 'Completed',
  },
  {
    key: '4',
    date: '13/09/2007',
    amount: 'EUR 1,000/=',
    type: 'Deposit',
    status: 'Cancelled',
  }, 
];

type dataType = {
  key: string;
  date: string;
  amount: string;
  type: string;
  status: string;
};

const TransactionsTableContainer = () => {

  const screens = useBreakpoint();

  const columnsFull: ColumnsType<dataType> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      // align: 'center',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'right',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // align: 'center',
    },
  ];

  const columnsHalf: ColumnsType<dataType> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      // align: 'center',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
    },
  ];

  var columns = columnsFull;

  if (screens.xs) {
    columns = columnsHalf;
  }

  return (
    <>
      <div className="title">
        <h3 >Transactions</h3>
        {screens.xs ? <Button className="button">More</Button> : null }
      </div>
      <hr className="line-top"></hr>
      <div className='table'>
        <Table 
          columns={columns}
          dataSource={data}
          pagination={false}
          // scroll={{ y: 280}}
          size='small'
          bordered 
        />
      </div>
    </>
  );
};

export default TransactionsTableContainer;