import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import { IndividualTransactionsContainer } from "../../containers";
import "./TransactionsTable.css";

interface ITransactionsTableProps {
  columns: any;
  transactions: any;
}

const TransactionsTable = (props: ITransactionsTableProps) => {
  const [showSingleTransactionModal, setShowSingleTransactionModal] = useState(
    false
  );
  const handleCancel = () => {
    setShowSingleTransactionModal(false);
  };
  const [
    singleTransactionReferenceId,
    setsingleTransactionReferenceId,
  ] = useState({});
  const [singleTransactionData, setsingleTransactionData] = useState({});

  return (
    <>
      <Table
        columns={props.columns}
        dataSource={props.transactions}
        pagination={false}
        size="small"
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setsingleTransactionReferenceId(record.key);
              setsingleTransactionData(record);
              setShowSingleTransactionModal(true);
            }, // click row
          };
        }}
      />
      <Modal
        title={`Transaction - ${singleTransactionReferenceId}`}
        visible={showSingleTransactionModal}
        onCancel={handleCancel}
        wrapClassName="single-transaction-modal"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <IndividualTransactionsContainer data={singleTransactionData} />
      </Modal>
    </>
  );
};
export default TransactionsTable;
