import { Modal } from "antd";
import React, { useState } from "react";
import {
  ExtendedWalletBallanceContainer,
  SendMoneyContainer,
} from "../../containers";
import { useAuthorisedContext } from "../../context/authorised-layout-context";
import "./Wallet.css";

const Wallet = () => {
  const [showSendMoneyModal, setshowSendMoneyModal] = useState(false);
  const { userWallets } = useAuthorisedContext();
  const [sendMoneyFuncRef, setSendMoneyFuncRef] = useState<any>();

  // initiate Sending Money
  const sendMoney = () => {
    if (sendMoneyFuncRef) {
      sendMoneyFuncRef.current();
    }
  };

  const handleCancel = () => {
    setshowSendMoneyModal(false);
  };

  const depositMoney = () => {
    console.log("depositin");
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
        depositMoney={depositMoney}
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
    </>
  );
};

export default Wallet;
