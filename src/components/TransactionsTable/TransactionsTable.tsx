import React, { useState } from "react";
import { Table, Modal } from 'antd';
import { IndividualTransactionsContainer } from "../../containers";
import "./TransactionsTable.css";

interface ITransactionsTableProps {
  columns: any;
  transactions: any;
}

const TransactionsTable = (props: ITransactionsTableProps) => {
  const [showSingleTransactionModal, setShowSingleTransactionModal] = useState(false);
  const handleCancel = () => {
    setShowSingleTransactionModal(false);
  };
  const [key, setKey] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  return (
    <>
      <Table
        columns={props.columns}
        dataSource={props.transactions}
        pagination={false}
        // scroll={{ y: 280}}
        size='small'

        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setKey(record.key);
              setDate(record.date);
              setAmount(record.amount);
              setType(record.type);
              setStatus(record.status);
              setShowSingleTransactionModal(true);
              console.log(rowIndex);
            } // click row
            // onDoubleClick: event => { }, // double click row
            // onContextMenu: event => { }, // right button click row
            // onMouseEnter: event => { }, // mouse enter row
            // onMouseLeave: event => { }, // mouse leave row
          };
        }}
      />
      <Modal
        title={`Transaction GB-${key}`}
        visible={showSingleTransactionModal}
        // onOk={}
        onCancel={handleCancel}
        // okText=""
        wrapClassName="single-transaction-modal"
      // confirmLoading={true}
      >
        <IndividualTransactionsContainer
          key={key}
          date={date}
          amount={amount}
          type={type}
          status={status}
        />
      </Modal>
    </>
  );
};
export default TransactionsTable;