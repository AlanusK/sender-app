import { Modal } from "antd";
import React, { useState } from "react";
import {
  ExtendedWalletBallanceContainer,
  SendMoneyContainer,
  DepositFormContainer,
  WithdrawalFormContainer,
  DepositChannelContainer,
} from "../../containers";
import { useAuthorisedContext } from "../../context/authorised-layout-context";
import "./Wallet.css";

const Wallet = () => {
  const [showSendMoneyModal, setshowSendMoneyModal] = useState(false);
  const [showDepositMoneyModal, setshowDepositMoneyModal] = useState(false);
  const [showWithdrawalMoneyModal, setshowWithdrawalMoneyModal] = useState(
    false
  );
  const { userWallets } = useAuthorisedContext();
  const [depositMoneyFuncRef, setDepositMoneyFuncRef] = useState<any>();

  // initiate Sending Money
  const sendMoney = () => {};

  const handleCancel = () => {
    setshowSendMoneyModal(false);
    setshowDepositMoneyModal(false);
    setshowWithdrawalMoneyModal(false);
  };

  const depositMoney = () => {
    if (depositMoneyFuncRef) {
      depositMoneyFuncRef.current();
    }
  };
  const withdrawalMoney = () => {};

  const addCurrency = () => {
    console.log("add currency");
  };

  return (
    <>
      <h1 className="wallet-title"> Wallet </h1>
      <ExtendedWalletBallanceContainer
        sendMoney={() => setshowSendMoneyModal(true)}
        depositMoney={() => setshowDepositMoneyModal(true)}
        withdrawalMoney={() => setshowWithdrawalMoneyModal(true)}
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
      >
        <SendMoneyContainer userBalances={userWallets} />
      </Modal>
      <Modal
        title="Deposit Money"
        visible={showDepositMoneyModal}
        onOk={depositMoney}
        onCancel={handleCancel}
        okText="Deposit"
        wrapClassName="deposit-money-modal"
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
      >
        <WithdrawalFormContainer userBalances={userWallets} />
      </Modal>
    </>
  );
};

export default Wallet;
