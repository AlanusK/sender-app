import { Button, Modal } from "antd";
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
import {
  maximumMobileWithdrawalAmount,
  supportedCurrencies,
} from "../../constants";
import useBreakpoint from "../../hooks/useBreakpoint";
import localForage from "localforage";
import { StellarUtils } from "../../stellarUtility";

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
interface IWithdrawalRequesttData {
  amount: string;
  customer_id: string;
  currency: string;
  fee: string;
  payout_info: {
    payout_channel: string;
    payout_channel_provider: string;
    payout_address: string;
    payout_address_name: string;
    swift_number: string;
    routing_number?: string;
    amount: string;
    currency: string;
  };
  authorization?: {
    status: boolean;
    authorized_at: Date;
    ledger_hash: string;
  };
  sep24_payout?: {
    transaction_id: string;
    amount: string;
  };
}

const postDeposit = (depositDetails: IdepositRequestData) => {
  return Promise.resolve(
    Axios.post(`${process.env.REACT_APP_API_URL}/deposit`, depositDetails)
  );
};
const postWithdrawal = (withdrawalDetails: IWithdrawalRequesttData) => {
  return Promise.resolve(
    Axios.post(`${process.env.REACT_APP_API_URL}/payout`, withdrawalDetails)
  );
};
const postPassword = ({
  password,
  userId,
}: {
  password: string;
  userId: string;
}) => {
  return Promise.resolve(
    Axios.post(`${process.env.REACT_APP_API_URL}/verify-password/${userId}`, {
      password: password,
    })
  );
};
const postWithdrawalAuthorization = (authToken: string) => {
  return Promise.resolve(
    Axios.post(`${process.env.REACT_APP_API_URL}/payout/authorize`, {
      payout_authorization_token: authToken,
      access_token: localStorage
        .getItem("userSessionToken")
        ?.split("Bearer ")[1],
    })
  );
};
const Wallet = () => {
  const [showSendMoneyModal, setshowSendMoneyModal] = useState(false);
  const [showDepositMoneyModal, setshowDepositMoneyModal] = useState(false);
  const [showWithdrawalMoneyModal, setshowWithdrawalMoneyModal] = useState(
    false
  );
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const {
    walletOperation,
    setWalletOperation,
    hasValidOperationalData,
    resetWalletOperationsData,
    setRequirePassword,
    requirePassword,
    operationPassword,
    setOperationAuthorized,
    operationAuthorized,
  } = useWalletOperationsContext();
  const {
    updateWalletBalances,
    userDetails,
    activeWallet,
    userWallets,
  } = useAuthorisedContext();
  const { execute, status, value, error = "" } = useAsync(
    walletOperation.kind === "DEPOSIT" ? postDeposit : postWithdrawal,
    false
  );
  const {
    execute: executePasswordVerification,
    status: passwordVerificationStatus = "idle",
    value: passwordVerificationValue,
  } = useAsync(postPassword, false);

  const {
    execute: executeWithdrawalAuthorization,
    status: withdrawalAuthorizationStatus,
    value: withdrawalAuthorizationValue,
    error: withdrawalAuthorizationError,
  } = useAsync(postWithdrawalAuthorization, false);

  const minmumAmount =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.minTransfer || 0;

  const [
    isProcessingNonCustodialWalletOperation,
    setIsProcessingNonCustodialWalletOperation,
  ] = useState<boolean | undefined>();

  const [SEP10AuthToken, setSEP10AuthToken] = useState<string>("");

  const [
    SEP24pendingWithdrawalTransaction,
    setPendingTransaction,
  ] = useState<string>("");

  // update wallet balance on every page view
  useEffect(() => {
    updateWalletBalances();
  }, []);

  // initiate Sending Money
  const sendMoney = () => {};

  const handleCancel = () => {
    updateWalletBalances();
    setshowSendMoneyModal(false);
    setshowDepositMoneyModal(false);
    setshowWithdrawalMoneyModal(false);
    setShowCurrencyModal(false);
  };

  const addCurrencyModal = () => {
    console.log("add currency modal");
    setShowCurrencyModal(true);
  };

  const addCurrencyComponent = () => {
    console.log("add currency component");
    setShowCurrencyComponent(true);
  };

  const currencyAdd = () => {
    console.log("currency add on wallet page");
  };

  const getUserKeypair = async () => {
    let userSecret: any = await localForage.getItem("user_key");
    userSecret = userSecret?.split(":")[0];
    return await StellarUtils.getKeypair(userSecret);
  };

  // retrive SEP24 authToken
  const setupSEP24TransactionOperations = async () => {
    if (!hasValidOperationalData) return; // don't send request if deposit has invalid information
    if (!(await localForage.getItem("user_key"))) {
      return setWalletOperation((existingDetails: IWalletOperationProps) => ({
        ...existingDetails,
        requireSecretKey: true,
      }));
    }
    setIsProcessingNonCustodialWalletOperation(true);
    const userKeyPair = await getUserKeypair();
    const authToken = await StellarUtils.getSEP10AuthToken(userKeyPair);
    if (!authToken) return;
    const userPublicKey = userKeyPair.publicKey();
    setSEP10AuthToken(authToken);
    return { authToken, userPublicKey };
  };

  const handleNoncustodialWithdrawal = async () => {
    const result: any = await setupSEP24TransactionOperations();
    if (!result?.authToken) {
      return;
    }
    const stellarTransaction = await StellarUtils.createSEP24Transaction(
      result?.authToken,
      result?.userPublicKey,
      walletOperation.currency,
      "withdraw"
    );
    if (!stellarTransaction) return;
    const withdrawalData: IWithdrawalRequesttData = {
      amount: walletOperation.amount.toString(),
      customer_id: userDetails.userId,
      currency: walletOperation.currency,
      fee: walletOperation.fee.toString(),
      payout_info: {
        payout_channel: walletOperation.receivingAccount.channel,
        payout_channel_provider:
          walletOperation.receivingAccount.channelProvider,
        payout_address: walletOperation.receivingAccount.accountNumber,
        payout_address_name: walletOperation.receivingAccount.accountName,
        swift_number: walletOperation.receivingAccount.swiftNumber,
        amount: (walletOperation.amount - walletOperation.fee).toString(),
        currency: walletOperation.currency,
      },
      sep24_payout: {
        transaction_id: stellarTransaction,
        amount: walletOperation.amount.toString(),
      },
    };
    return execute(withdrawalData);
  };

  const withdrawalMoney = () => {
    // if amount is above maximum withdrawal via mobile money
    if (
      walletOperation.amount >
      maximumMobileWithdrawalAmount(activeWallet.currency)
    )
      return;
    if (!userDetails.secretKey) {
      return handleNoncustodialWithdrawal();
    }
    const withdrawalData: IWithdrawalRequesttData = {
      amount: walletOperation.amount.toString(),
      customer_id: userDetails.userId,
      currency: walletOperation.currency,
      fee: walletOperation.fee.toString(),
      payout_info: {
        payout_channel: walletOperation.receivingAccount.channel,
        payout_channel_provider:
          walletOperation.receivingAccount.channelProvider,
        payout_address: walletOperation.receivingAccount.accountNumber,
        payout_address_name: walletOperation.receivingAccount.accountName,
        swift_number: walletOperation.receivingAccount.swiftNumber,
        amount: (walletOperation.amount - walletOperation.fee).toString(),
        currency: walletOperation.currency,
      },
    };
    return execute(withdrawalData);
  };

  const handleNoncustodialDeposits = async () => {
    const {
      userPublicKey,
      authToken,
    }: any = await setupSEP24TransactionOperations();
    const stellarTransaction = await StellarUtils.createSEP24Transaction(
      authToken,
      userPublicKey,
      walletOperation.currency,
      "deposit"
    );
    if (!stellarTransaction) return;
    setIsProcessingNonCustodialWalletOperation(false);
    execute({
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
      hooks: {
        confirm_sep24_deposit: {
          amount: walletOperation.amount.toString(),
          transaction_id: stellarTransaction,
        },
      },
    });
  };

  const initiateMoneyDeposit = async () => {
    if (!hasValidOperationalData) return; // don't send request if deposit has invalid information
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
    if (!userDetails.secretKey) {
      return handleNoncustodialDeposits();
    }
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

  useEffect(() => {
    if (status === "success" && value.data?.authorization_token) {
      setRequirePassword(true);
    }
    if (status === "success" && value.data?.sep24_payout?.transaction_id) {
      setPendingTransaction(value.data?.sep24_payout?.transaction_id);
      setRequirePassword(true);
    }
  }, [
    setRequirePassword,
    status,
    value?.data.authorization_token,
    value?.data.sep24_payout?.transaction_id,
  ]);
  useEffect(() => {
    if (
      passwordVerificationStatus === "success" &&
      passwordVerificationValue?.data === true &&
      SEP24pendingWithdrawalTransaction
    ) {
      StellarUtils.retrieveSEP24Transaction(
        SEP10AuthToken,
        SEP24pendingWithdrawalTransaction
      )
        .then((result) => {
          if (result.transaction.status !== "pending_user_transfer_start") {
            return;
          }
          setWalletOperation((existingDetails: IWalletOperationProps) => ({
            ...existingDetails,
            processingValue: result.transaction,
            processingStatus: "pending",
          }));
          getUserKeypair().then((keypair: any) => {
            StellarUtils.initiateAssetTransfer(
              keypair,
              SEP10AuthToken,
              result.transaction,
              walletOperation.currency
            ).then((result: any) => {
              setIsProcessingNonCustodialWalletOperation(false);
              if (result.hash) {
                return setWalletOperation(
                  (existingDetails: IWalletOperationProps) => ({
                    ...existingDetails,
                    processingStatus: "success",
                  })
                );
              }
              setWalletOperation((existingDetails: IWalletOperationProps) => ({
                ...existingDetails,
                processingStatus: "error",
              }));
            });
          });
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    }
  }, [
    SEP10AuthToken,
    passwordVerificationStatus,
    SEP24pendingWithdrawalTransaction,
    walletOperation.currency,
    setWalletOperation,
  ]);

  useEffect(() => {
    // initiate custodial withdrawal authorization
    if (passwordVerificationStatus === "success") {
      setOperationAuthorized(passwordVerificationValue.data);
      setWalletOperation((existingDetails: IWalletOperationProps) => ({
        ...existingDetails,
        processingStatus: "idle",
        processingValue: null,
        processingError: "",
      }));
    }
  }, [
    passwordVerificationStatus,
    passwordVerificationValue?.data,
    setOperationAuthorized,
    setWalletOperation,
  ]);

  useEffect(() => {
    if (operationAuthorized && value?.data.authorization_token) {
      executeWithdrawalAuthorization(value.data.authorization_token);
    }
  }, [
    executeWithdrawalAuthorization,
    operationAuthorized,
    value?.data.authorization_token,
  ]);

  useEffect(() => {
    if (operationAuthorized) {
      setWalletOperation((existingDetails: IWalletOperationProps) => ({
        ...existingDetails,
        processingStatus: withdrawalAuthorizationStatus,
        processingValue: withdrawalAuthorizationValue,
        processingError: withdrawalAuthorizationError,
      }));
      setRequirePassword(false);
    }
  }, [
    operationAuthorized,
    setRequirePassword,
    setWalletOperation,
    withdrawalAuthorizationError,
    withdrawalAuthorizationStatus,
    withdrawalAuthorizationValue,
  ]);

  const screens = useBreakpoint();
  const [mobileView, setMobileView] = useState<Boolean>(false);
  const [showSendMoneyComponent, setshowSendMoneyComponent] = useState(false);
  const [showDepositMoneyComponent, setshowDepositMoneyComponent] = useState(
    false
  );
  const [
    showWithdrawalMoneyComponent,
    setshowWithdrawalMoneyComponent,
  ] = useState(false);
  const [showCurrencyComponent, setShowCurrencyComponent] = useState(false);
  useEffect(() => {
    if (screens.xs) {
      setMobileView(true);
    } else {
      setMobileView(false);
      setshowSendMoneyComponent(false);
      setshowDepositMoneyComponent(false);
      setshowWithdrawalMoneyComponent(false);
      setShowCurrencyComponent(false);
    }
  }, [screens.xs, setMobileView]);

  return (
    <>
      <h1 className="wallet-title"> Wallet </h1>
      <ExtendedWalletBallanceContainer
        sendMoney={() => {
          resetWalletOperationsData(); // start with fresh object
          setRequirePassword(false);
          setshowSendMoneyModal(true);
        }}
        depositMoney={() => {
          resetWalletOperationsData(); // start with fresh object
          return setshowDepositMoneyModal(true);
        }}
        withdrawalMoney={() => {
          resetWalletOperationsData(); // start with fresh object
          setOperationAuthorized(undefined);
          setRequirePassword(false);
          return setshowWithdrawalMoneyModal(true);
        }}
        userBalances={userWallets}
        addCurrency={addCurrencyComponent}
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
        footer={
          walletOperation.requireSecretKey
            ? [
                <Button
                  key="ok"
                  onClick={() => {
                    localForage.getItem("user_key").then((value: any) => {
                      if (!value) return;
                      setWalletOperation(
                        (existingDetails: IWalletOperationProps) => ({
                          ...existingDetails,
                          requireSecretKey: false,
                          processingStatus: "pending",
                        })
                      );
                      if (!userDetails.secretKey) {
                        return handleNoncustodialDeposits();
                      }
                    });
                  }}
                >
                  Add Secret Key
                </Button>,
              ]
            : walletOperation.processingStatus === "success"
            ? [
                <Button key="back" onClick={handleCancel}>
                  Close
                </Button>,
              ]
            : [
                <Button key="back" onClick={handleCancel}>
                  Close
                </Button>,
                <Button
                  key="ok"
                  loading={
                    status === "pending" ||
                    isProcessingNonCustodialWalletOperation
                      ? true
                      : false
                  }
                  onClick={initiateMoneyDeposit}
                  disabled={
                    !hasValidOperationalData ||
                    status === "pending" ||
                    walletOperation.amount < minmumAmount ||
                    isProcessingNonCustodialWalletOperation
                      ? true
                      : false
                  }
                >
                  {walletOperation.processingStatus === "pending"
                    ? "Confirming..."
                    : "Confirm"}
                </Button>,
              ]
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
        title={requirePassword ? "Authorize Withdrawal" : "Withdrawal Money"}
        visible={showWithdrawalMoneyModal}
        okText="Withdrawal"
        wrapClassName="withdrawal-money-modal"
        destroyOnClose={true}
        footer={
          walletOperation.requireSecretKey
            ? [
                <Button
                  key="ok"
                  onClick={() => {
                    localForage.getItem("user_key").then((value: any) => {
                      if (!value) return;
                      setWalletOperation(
                        (existingDetails: IWalletOperationProps) => ({
                          ...existingDetails,
                          requireSecretKey: false,
                          processingStatus: "pending",
                        })
                      );
                      if (!userDetails.secretKey) {
                        handleNoncustodialWithdrawal();
                        return setRequirePassword(true);
                      }
                    });
                  }}
                >
                  Add Secret Key
                </Button>,
              ]
            : walletOperation.processingStatus === "success" && !requirePassword
            ? [
                <Button key="back" onClick={handleCancel}>
                  Close
                </Button>,
              ]
            : requirePassword
            ? [
                <Button key="back" onClick={handleCancel}>
                  Close
                </Button>,
                <Button
                  key="ok"
                  onClick={() => {
                    if (!operationPassword) return;
                    executePasswordVerification({
                      password: operationPassword,
                      userId: userDetails.userId,
                    });
                  }}
                  disabled={
                    passwordVerificationStatus === "pending" ? true : false
                  }
                >
                  {passwordVerificationStatus === "pending"
                    ? "Authorizing..."
                    : "Authorize"}
                </Button>,
              ]
            : withdrawalAuthorizationStatus === "pending"
            ? [<Button disabled={true}>Processing...</Button>]
            : [
                <Button key="back" onClick={handleCancel}>
                  Close
                </Button>,
                <Button
                  key="ok"
                  onClick={withdrawalMoney}
                  disabled={
                    !hasValidOperationalData ||
                    status === "pending" ||
                    walletOperation.amount < minmumAmount ||
                    isProcessingNonCustodialWalletOperation
                      ? true
                      : false
                  }
                  loading={
                    status === "pending" ||
                    isProcessingNonCustodialWalletOperation
                      ? true
                      : false
                  }
                >
                  {walletOperation.processingStatus === "pending"
                    ? "Initiating..."
                    : "Withdrawal"}
                </Button>,
              ]
        }
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
