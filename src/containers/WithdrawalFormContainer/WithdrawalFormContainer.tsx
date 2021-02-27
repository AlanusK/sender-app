import { Col, Form, Input, Row, Tag } from "antd";
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
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
interface IWithdrawalFormProps {
  userBalances: userWalletsBalanceProps[];
}

export default function WithdrawalFormContainer({
  userBalances,
}: IWithdrawalFormProps) {
  const { activeWallet, setactiveWallet, userWallets } = useAuthorisedContext();
  const {
    setWalletOperation,
    requirePassword,
    setOperationPassword,
    operationAuthorized,
    setOperationAuthorized
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

  console.log("operationAuthorized :>> ", operationAuthorized);

  return (
    <div>
      {requirePassword ? (
        <Form.Item
          label={<label style={{ color: "gray" }}>Account Password</label>}
          //style={{ width: screens.xs ? "200px" : "412px" }}
          name="password-input"
          validateStatus={operationAuthorized === false? "error" : ""}
          help={operationAuthorized === false ? "Invalid password" : ""}
        >
          <Input.Password
            onChange={(e) => {
              setOperationAuthorized(undefined)
              setOperationPassword(e.target.value)}}
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
              <Form.Item validateStatus={validationStatus} help={helpMessage}>
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
  );
}
