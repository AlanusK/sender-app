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
            onClick: event => setShowSingleTransactionModal(true), // click row
            // onDoubleClick: event => { }, // double click row
            // onContextMenu: event => { }, // right button click row
            // onMouseEnter: event => { }, // mouse enter row
            // onMouseLeave: event => { }, // mouse leave row
          };
        }}
      />
      <Modal
        title="Transaction GB-1002"
        visible={showSingleTransactionModal}
        // onOk={}
        onCancel={handleCancel}
        // okText=""
        wrapClassName="single-transaction-modal"
        // confirmLoading={true}
      >
        <IndividualTransactionsContainer />
      </Modal>
    </>
  );
};
export default TransactionsTable;