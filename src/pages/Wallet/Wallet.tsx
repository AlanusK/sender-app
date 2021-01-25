import { Modal } from "antd";
import React, { useState } from "react";
import {
  ExtendedWalletBallanceContainer,
  SendMoneyContainer,
  DepositFormContainer,
  WithdrawalFormContainer,
} from "../../containers";
import { useAuthorisedContext } from "../../context/authorised-layout-context";
import "./Wallet.css";

const Wallet = () => {
  const [showSendMoneyModal, setshowSendMoneyModal] = useState(false);
  const [showDepositMoneyModal, setshowDepositMoneyModal] = useState(false);
  const [showWithdrawalMoneyModal, setshowWithdrawalMoneyModal] = useState(false);
  const { userWallets } = useAuthorisedContext();
  const [sendMoneyFuncRef, setSendMoneyFuncRef] = useState<any>();
  const [depositMoneyFuncRef, setDepositMoneyFuncRef] = useState<any>();
  const [withdrawalMoneyFuncRef, setWithdrawalMoneyFuncRef] = useState<any>();

  // initiate Sending Money
  const sendMoney = () => {
    if (sendMoneyFuncRef) {
      sendMoneyFuncRef.current();
    }
  };

  const handleCancel = () => {
    setshowSendMoneyModal(false);
    setshowDepositMoneyModal(false);
    setshowWithdrawalMoneyModal(false);
  };

  const depositMoney = () => {
    // console.log("depositin");
    if (depositMoneyFuncRef) {
      depositMoneyFuncRef.current();
    }
  };
  const withdrawalMoney = () => {
    // console.log("withdrawaling");
    if (withdrawalMoneyFuncRef) {
      withdrawalMoneyFuncRef.current();
    }
  };

  const addCurrency = () => {
    console.log("add currency");
  };

  return (
    <>
      <h1 className="wallet-title"> Wallet </h1>
      <ExtendedWalletBallanceContainer
        sendMoney={() => setshowSendMoneyModal(true)}
        // depositMoney={depositMoney}
        depositMoney={() => setshowDepositMoneyModal(true)}
        // withdrawalMoney={withdrawalMoney}
        withdrawalMoney={() => setshowDepositMoneyModal(true)}
        userBalances={userWallets}
        addCurrency={addCurrency}
      />
      <Modal
        title="Send Money"
        visible={showSendMoneyModal}
        onOk={sendMoney}
        onCancel={handleCancel}
        okText="Send"
        wrapClassName="send-money-modal"
        //confirmLoading={true}
      >
        <SendMoneyContainer
          setSendMoneyFuncRef={setSendMoneyFuncRef}
          userBalances={userWallets}
        />
      </Modal>
      <Modal
        title="Deposit Money"
        visible={showDepositMoneyModal}
        onOk={depositMoney}
        onCancel={handleCancel}
        okText="Deposit"
        wrapClassName="deposit-money-modal"
        //confirmLoading={true}
      >
        <DepositFormContainer
          setDepositMoneyFuncRef={setDepositMoneyFuncRef}
          userBalances={userWallets}
        />
      </Modal>
      <Modal
        title="Withdrawal Money"
        visible={showWithdrawalMoneyModal}
        onOk={withdrawalMoney}
        onCancel={handleCancel}
        okText="Withdrawal"
        wrapClassName="withdrawal-money-modal"
        //confirmLoading={true}
      >
        <WithdrawalFormContainer
          setWithdrawalMoneyFuncRef={setWithdrawalMoneyFuncRef}
          userBalances={userWallets}
        />
      </Modal>
    </>
  );
};

export default Wallet;
