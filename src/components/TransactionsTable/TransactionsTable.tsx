import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import { IndividualTransactionsContainer } from "../../containers";
import "./TransactionsTable.css";
import { IndividualTransactionsProps } from "../../types";

interface ITransactionsTableProps {
  columns: any;
  // transactions: any;
  scroll: any;
  transactions: IndividualTransactionsProps[];
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
  const [singleTransactionData, setsingleTransactionData] = useState<any>();
  return (
    <>
      <Table
        columns={props.columns}
        dataSource={props.transactions}
        pagination={false}
        size="small"
        scroll={props.scroll}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setsingleTransactionReferenceId(record.meta.reference_id);
              setsingleTransactionData(record);
              setShowSingleTransactionModal(true);
            }, // click row
          };
        }}
      />
      <Modal
        title={`${
          singleTransactionData?.type === "Deposit" ? "Deposit" : "Withdrawal"
        }`}
        visible={showSingleTransactionModal}
        onCancel={handleCancel}
        wrapClassName="single-transaction-modal"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        closeIcon={" "}
        destroyOnClose={true}
      >
        <IndividualTransactionsContainer data={singleTransactionData} />
      </Modal>
    </>
  );
};
export default TransactionsTable;
