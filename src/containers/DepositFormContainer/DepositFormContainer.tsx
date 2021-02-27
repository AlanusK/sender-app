import { Col, Form, Input, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { DepositChannelContainer, SelectCurrencyContainer } from "..";
import { CustomCurrencyInput } from "../../components";
import {
  debounce,
  generateUniqueReferenceId,
  toDecimalMark,
} from "../../utility";
import "./DepositFormContainer.css";
import { IWalletOperationProps, userWalletsBalanceProps } from "../../types";
import { useAuthorisedContext } from "../../context/authorised-user-context";
import { useWalletOperationsContext } from "../../context/wallet-operations-context";
import { supportedCurrencies } from "../../constants";

interface IDepositFormProps {
  onValueChange?(): void;
  userBalances: userWalletsBalanceProps[];
}

export default function DepositFormContainer({
  userBalances,
}: IDepositFormProps) {
  const { activeWallet, setactiveWallet, userWallets } = useAuthorisedContext();
  const {
    resetWalletOperationsData,
    setWalletOperation,
    walletOperation: { processingStatus },
  } = useWalletOperationsContext();
  const [depositReference, setDepositReference] = useState<string>(
    generateUniqueReferenceId("SDEP")
  );
  const balanceAmount = activeWallet.balance;
  const [validationStatus, SetValidationStatus] = useState<
    "" | "error" | "success" | "warning" | "validating"
  >("");
  const [helpMessage, setHelpMessage] = useState<string>("");
  const [transferAmount, SetTransferAmount] = useState<number>(0);
  let isCurrencySelected = activeWallet?.currency ? true : false;
  const minmumAmount =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.minTransfer || 0;
  const handleCurrencyChange = (currency: string, options: any) => {
    const currencyBalance = userBalances.find(
      (walletBalance: any) => walletBalance.currency === currency
    );
    setactiveWallet({
      currency: currencyBalance?.currency || "",
      balance: currencyBalance?.amount || 0,
    });
    isCurrencySelected = true;
    resetWalletOperationsData();
    SetTransferAmount(0);
  };

  const handleAmountChange = (value: string) => {
    validateAmount(Number(value));
    const debouncedSetTransferAmount = debounce(SetTransferAmount, 1000);
    debouncedSetTransferAmount(Number(value) ? Number(value) : 0);
    setWalletOperation((existingDetails: IWalletOperationProps) => ({
      ...existingDetails,
      processingStatus: "idle",
    }));
  };

  const validateAmount = (value: number) => {
    if (value <= minmumAmount) {
      SetValidationStatus("error");
      return setHelpMessage(
        `Min: ${
          supportedCurrencies.find(
            (curr) => curr.currency === activeWallet.currency
          )?.symbol || ""
        }${toDecimalMark(minmumAmount + 1)}`
      );
    }
    SetValidationStatus("success");
    setHelpMessage("");
  };

  // add new details on deposit operation
  useEffect(() => {
    setWalletOperation((existingDetails: IWalletOperationProps) => ({
      ...existingDetails,
      currency: activeWallet?.currency,
      amount: transferAmount,
      referenceId: depositReference,
      kind: "DEPOSIT",
    }));
  }, [
    activeWallet?.currency,
    depositReference,
    setWalletOperation,
    transferAmount,
  ]);

  //generates a new deposit reference
  useEffect(() => {
    setDepositReference(generateUniqueReferenceId("SDEP"));
  }, [transferAmount]);

  return (
    <div>
      <Input.Group size="large">
        {processingStatus !== "success" && (
          <Row gutter={[12, 0]}>
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
                <Tag color="default">
                  {`Balance: ${
                    supportedCurrencies.filter(
                      (curr) => curr.currency === activeWallet.currency
                    )[0]?.symbol
                  } ${toDecimalMark(balanceAmount)}`}
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
        )}
        {transferAmount !== 0 && validationStatus !== "error" && (
          <DepositChannelContainer />
        )}
      </Input.Group>
    </div>
  );
}
