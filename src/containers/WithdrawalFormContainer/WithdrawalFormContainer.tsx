import { Col, Form, Input, Result, Row, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { SelectCurrencyContainer } from "..";
import { CustomCurrencyInput } from "../../components";
import { debounce, toDecimalMark } from "../../utility";
import { IWalletOperationProps, userWalletsBalanceProps } from "../../types";
import "./WithdrawalFormContainer.css";
import { useAuthorisedContext } from "../../context/authorised-user-context";
import { supportedCurrencies } from "../../constants";
import { useWalletOperationsContext } from "../../context/wallet-operations-context";
import { PayoutChannelContainer } from "../../containers";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { StellarUtils } from "../../stellarUtility";

import localForage from "localforage";
interface IWithdrawalFormProps {
  userBalances: userWalletsBalanceProps[];
}

export default function WithdrawalFormContainer({
  userBalances,
}: IWithdrawalFormProps) {
  const {
    activeWallet,
    setactiveWallet,
    userWallets,
    userDetails,
  } = useAuthorisedContext();
  const {
    setWalletOperation,
    requirePassword,
    setOperationPassword,
    operationAuthorized,
    setOperationAuthorized,
    walletOperation,
  } = useWalletOperationsContext();
  const [validationStatus, SetValidationStatus] = useState<
    "" | "error" | "success" | "warning" | "validating"
  >("");
  const [helpMessage, setHelpMessage] = useState<string>("");
  const [hasSufficientBalance, SetHasSufficientBalance] = useState<boolean>(
    true
  );
  const balanceAmount = activeWallet.balance;
  let isCurrencySelected = activeWallet?.currency ? true : false;
  const minmumAmount =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.minTransfer || 0;
  const maxmumAmount =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.maxTransfer || 0;
  const [withdrawalAmount, SetWithdrawalAmount] = useState<number>(0);

  const handleCurrencyChange = (currency: string, options: any) => {
    const currencyBalance = userBalances.find(
      (walletBalance: any) => walletBalance.currency === currency
    );
    setactiveWallet({
      currency: currencyBalance?.currency || "",
      balance: currencyBalance?.amount || 0,
    });
    isCurrencySelected = true;
    SetValidationStatus("error");
  };

  const handleAmountChange = (value: string) => {
    validateAmount(Number(value));
    validateWalletBalance(Number(value));
    const debouncedSetWithdrawalAmount = debounce(SetWithdrawalAmount, 1000);
    debouncedSetWithdrawalAmount(Number(value) ? Number(value) : 0);
  };

  const validateWalletBalance = (value: number) => {
    if (value > balanceAmount) {
      SetHasSufficientBalance(false);
      return;
    }
    SetHasSufficientBalance(true);
  };

  const validateAmount = (value: number) => {
    if (!value) return SetValidationStatus("error");
    if (value <= minmumAmount) {
      SetValidationStatus("error");
      setHelpMessage(
        `Min:  ${
          supportedCurrencies.find(
            (curr) => curr.currency === activeWallet.currency
          )?.symbol
        } ${toDecimalMark(minmumAmount + 1)}`
      );
      return;
    }
    if (value >= maxmumAmount) {
      SetValidationStatus("error");
      setHelpMessage(
        `Max: ${
          supportedCurrencies.find(
            (curr) => curr.currency === activeWallet.currency
          )?.symbol
        }${toDecimalMark(maxmumAmount)}`
      );
      return;
    }
    SetValidationStatus("success");
    setHelpMessage("");
  };

  useEffect(() => {
    setWalletOperation((existingDetails: IWalletOperationProps) => ({
      ...existingDetails,
      currency: activeWallet?.currency,
      amount: withdrawalAmount,
      kind: "WITHDRAWAL",
    }));
  }, [activeWallet?.currency, setWalletOperation, withdrawalAmount]);

  const setUserSecretKey = async (secret: string) => {
    const isValidKey = await StellarUtils.validateStellarWalletSecretKey(
      secret
    );
    if (!isValidKey) {
      return setWalletOperation((existingDetails: IWalletOperationProps) => ({
        ...existingDetails,
        processingError: "invalid_secret",
      }));
    }
    setWalletOperation((existingDetails: IWalletOperationProps) => ({
      ...existingDetails,
      processingError: "",
    }));
    localForage.setItem("user_key", secret + ":" + userDetails.userId);
  };
  return (
    <>
      {walletOperation.requireSecretKey ? (
        <Form.Item
          label={<label style={{ color: "gray" }}>Wallet Secret Key:</label>}
          name="secret-key-input"
          validateStatus={
            walletOperation.processingError === "invalid_secret" ? "error" : ""
          }
          help={
            walletOperation.processingError === "invalid_secret"
              ? "Invalid key"
              : ""
          }
          style={{ marginBottom: "-30px" }}
        >
          <Input.Password
            onChange={(e) => setUserSecretKey(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      ) : !operationAuthorized ? (
        <div>
          {requirePassword ? (
            <Form.Item
              label={<label style={{ color: "gray" }}>Account Password</label>}
              //style={{ width: screens.xs ? "200px" : "412px" }}
              name="password-input"
              validateStatus={operationAuthorized === false ? "error" : ""}
              help={operationAuthorized === false ? "Invalid password" : ""}
            >
              <Input.Password
                onChange={(e) => {
                  setOperationAuthorized(undefined);
                  setOperationPassword(e.target.value);
                }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          ) : (
            <Input.Group size="large">
              <Row gutter={[12, 12]}>
                <Col>
                  <SelectCurrencyContainer
                    onCurrencyChange={handleCurrencyChange}
                    currencyOptions={userWallets.map((curr) => {
                      return { currency: curr.currency };
                    })}
                  />
                  <p
                    className={"account-balance-tag"}
                    style={{ marginTop: 5 }}
                    hidden={!isCurrencySelected}
                  >
                    <Tag color={hasSufficientBalance ? "green" : "red"}>
                      {`Balance: ${
                        supportedCurrencies.filter(
                          (curr) => curr.currency === activeWallet.currency
                        )[0]?.symbol
                      }${toDecimalMark(balanceAmount)}`}
                    </Tag>
                  </p>
                </Col>
                <Col>
                  <Form.Item
                    validateStatus={validationStatus}
                    help={helpMessage}
                  >
                    <CustomCurrencyInput
                      prefix={
                        supportedCurrencies.find(
                          (curr) => curr.currency === activeWallet.currency
                        )?.symbol || ""
                      }
                      disabled={!isCurrencySelected}
                      onChange={handleAmountChange}
                      height={32}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          )}
          {validationStatus === "success" && hasSufficientBalance && (
            <PayoutChannelContainer />
          )}
        </div>
      ) : (
        <div>
          {walletOperation.processingStatus === "pending" && (
            <h3 style={{ margin: "10px 0 0 110px" }}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
              {" Please wait..."}
            </h3>
          )}
          {walletOperation.processingStatus === "error" && (
            <Result
              status="error"
              title="Submission Failed"
              subTitle={walletOperation.processingError.toString()}
            ></Result>
          )}
          {walletOperation.processingStatus === "success" &&
            walletOperation.processingValue?.data?.status === "PROCESSING" && (
              <Result
                status="success"
                title="Withdrawal Succesful!"
                subTitle="Total amount will be settled into your account within 24hr."
              ></Result>
            )}
          {walletOperation.processingStatus === "success" &&
            walletOperation.processingValue?.withdraw_memo && (
              <Result
                status="success"
                title="Withdrawal Succesful!"
                subTitle="Total amount will be settled into your account within 24hr."
              ></Result>
            )}
        </div>
      )}
    </>
  );
}
