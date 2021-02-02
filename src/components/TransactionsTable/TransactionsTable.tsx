import React, { useState } from "react";
import { Table, Modal, Button } from 'antd';
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
  const [key, setKey] = useState({});
  const [data, setData] = useState({});

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
              setData(record);
              setShowSingleTransactionModal(true);
            } // click row
          };
        }}
      />
      <Modal
        title={`Transaction - ${key}`}
        visible={showSingleTransactionModal}
        // onOk={}
        onCancel={handleCancel}
        // okText=""
        wrapClassName="single-transaction-modal"
        // confirmLoading={true}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <IndividualTransactionsContainer data={data} />
      </Modal>
    </>
  );
};
export default TransactionsTable;