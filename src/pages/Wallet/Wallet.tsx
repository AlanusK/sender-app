import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  ExtendedWalletBallanceContainer,
  SendMoneyContainer,
  DepositFormContainer,
  WithdrawalFormContainer,
  SelectCurrencyContainer,
} from "../../containers";
import { useAuthorisedContext } from "../../context/authorised-user-context";
import "./Wallet.css";
import { useAsync } from "../../hooks/useAsync";
import { useWalletOperationsContext } from "../../context/wallet-operations-context";
import { IWalletOperationProps } from "../../types";
const Axios = require("axios").default;

interface IdepositRequestData {
  customer_id: string;
  expected_amount: string;
  currency: string;
  reference_id: string;
  deposit: {
    channel: string;
    channel_provider: string;
    account_name: string;
    account_address: string;
    account_currency: string;
  };
  confirmation: {
    transaction_reference: string;
    confirmed_by: string;
    confirmedAt: string;
  };
}

const postDeposit = (depositDetails: IdepositRequestData) => {
  return Promise.resolve(
    Axios.post(`${process.env.REACT_APP_API_URL}/deposit`, depositDetails)
  );
};
const Wallet = () => {
  const {
    walletOperation,
    setWalletOperation,
    hasValidData,
  } = useWalletOperationsContext();
  const { execute, status, value, error = "" } = useAsync(postDeposit, false);
  const [showSendMoneyModal, setshowSendMoneyModal] = useState(false);
  const [showDepositMoneyModal, setshowDepositMoneyModal] = useState(false);
  const [showWithdrawalMoneyModal, setshowWithdrawalMoneyModal] = useState(
    false
  );
  const {
    userWallets,
    updateWalletBalances,
    userDetails,
  } = useAuthorisedContext();
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  // update wallet balance on every page view
  useEffect(() => {
    updateWalletBalances();
  }, []);

  // initiate Sending Money
  const sendMoney = () => {};

  const handleCancel = () => {
    setshowSendMoneyModal(false);
    setshowDepositMoneyModal(false);
    setshowWithdrawalMoneyModal(false);
    setShowCurrencyModal(false);
  };

  const withdrawalMoney = () => {};

  const addCurrency = () => {
    console.log("add currency");
    setShowCurrencyModal(true);
  };

  const currencyAdd = () => {
    console.log("currency add on wallet page");
  };

  const initiateMoneyDeposit = async () => {
    if (walletOperation.processingStatus !== "idle")
      return setshowDepositMoneyModal(false); // close if deposit was submited succesul
    if (!hasValidData) return; // don't send request if deposit has invalid information
    const depositData: IdepositRequestData = {
      customer_id: userDetails.userId,
      expected_amount: walletOperation.amount.toString(),
      currency: walletOperation.currency,
      reference_id: walletOperation.referenceId,
      confirmation: {
        confirmedAt: new Date().toUTCString(),
        confirmed_by: userDetails.userId,
        transaction_reference: walletOperation.referenceId,
      },
      deposit: {
        channel: walletOperation.receivingAccount.channel,
        channel_provider: walletOperation.receivingAccount.channelProvider,
        account_address: walletOperation.receivingAccount.accountNumber.toString(),
        account_currency: walletOperation.currency,
        account_name: walletOperation.receivingAccount.accountName,
      },
    };
    execute(depositData);
  };

  // set async details for a wallet operation
  useEffect(() => {
    setWalletOperation((existingDetails: IWalletOperationProps) => ({
      ...existingDetails,
      processingStatus: status,
      processingValue: value,
      processingError: error,
    }));
  }, [error, setWalletOperation, status, value]);

  return (
    <>
      <h1 className="wallet-title"> Wallet </h1>
      <ExtendedWalletBallanceContainer
        sendMoney={() => setshowSendMoneyModal(true)}
        depositMoney={() => {
          setWalletOperation((existingDetails: IWalletOperationProps) => ({
            ...existingDetails,
            processingStatus: "idle",
          }));
          return setshowDepositMoneyModal(true);
        }}
        withdrawalMoney={() => setshowWithdrawalMoneyModal(true)}
        userBalances={userWallets}
        addCurrency={addCurrency}
      />
      {/*  send money modal */}
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
      {/*  deposit money modal */}
      <Modal
        title="Deposit Money"
        visible={showDepositMoneyModal}
        onOk={initiateMoneyDeposit}
        onCancel={handleCancel}
        okText={
          walletOperation.processingStatus === "pending"
            ? "Confirming..."
            : walletOperation.processingStatus === "success"
            ? "Okay"
            : "Confirm"
        }
        wrapClassName="deposit-money-modal"
        destroyOnClose={true}
        okButtonProps={{
          disabled: status === "pending" ? true : false,
        }}
      >
        <DepositFormContainer userBalances={userWallets} />
      </Modal>
      {/*  withdrawal money modal */}
      <Modal
        title="Withdrawal Money"
        visible={showWithdrawalMoneyModal}
        onOk={withdrawalMoney}
        onCancel={handleCancel}
        okText="Withdrawal"
        wrapClassName="withdrawal-money-modal"
        destroyOnClose={true}
      >
        <WithdrawalFormContainer userBalances={userWallets} />
      </Modal>
      {/*  add new currency modal */}
      <Modal
        title="Add Currency"
        visible={showCurrencyModal}
        onOk={currencyAdd}
        onCancel={handleCancel}
        okText="Add"
        wrapClassName="add-currency-modal"
        destroyOnClose={true}
      >
        <SelectCurrencyContainer
          currencyOptions={[{ currency: "TZS" }]}
          width={412}
        />
      </Modal>
    </>
  );
};

export default Wallet;
