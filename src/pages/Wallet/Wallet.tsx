import { Modal } from "antd";
import React, { useState } from "react";
import {
  ExtendedWalletBallanceContainer,
  SendMoneyContainer,
  DepositFormContainer,
} from "../../containers";
import { useAuthorisedContext } from "../../context/authorised-layout-context";
import "./Wallet.css";

const Wallet = () => {
  const [showSendMoneyModal, setshowSendMoneyModal] = useState(false);
  const [showDepositMoneyModal, setshowDepositMoneyModal] = useState(false);
  const { userWallets } = useAuthorisedContext();
  const [sendMoneyFuncRef, setSendMoneyFuncRef] = useState<any>();
  const [depositMoneyFuncRef, setDepositMoneyFuncRef] = useState<any>();

  // initiate Sending Money
  const sendMoney = () => {
    if (sendMoneyFuncRef) {
      sendMoneyFuncRef.current();
    }
  };

  const handleCancel = () => {
    setshowSendMoneyModal(false);
    setshowDepositMoneyModal(false);
  };

  const depositMoney = () => {
    // console.log("depositin");
    if (depositMoneyFuncRef) {
      depositMoneyFuncRef.current();
    }
  };
  const withdrawalMoney = () => {
    console.log("withdrawaling");
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
        withdrawalMoney={withdrawalMoney}
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
    </>
  );
};

export default Wallet;
