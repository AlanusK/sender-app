import { Col, Form, Input, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { SelectCurrencyContainer, PaymentSummaryContainer } from "..";
import { CustomCurrencyInput } from "../../components";
import { debounce, toDecimalMark } from "../../utility";
import { IWalletOperationProps, userWalletsBalanceProps } from "../../types";
import "./WithdrawalFormContainer.css";
import { useAuthorisedContext } from "../../context/authorised-user-context";
import { supportedCurrencies } from "../../constants";
import { useWalletOperationsContext } from "../../context/wallet-operations-context";
import { PayoutChannelContainer } from "../../containers";

interface IWithdrawalFormProps {
  userBalances: userWalletsBalanceProps[];
}

export default function WithdrawalFormContainer({
  userBalances,
}: IWithdrawalFormProps) {
  const { activeWallet, setactiveWallet, userWallets } = useAuthorisedContext();
  const { setWalletOperation } = useWalletOperationsContext();
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
  const withdrawalFee =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.transferFee || 0;
  const [withdrawalAmount, SetWithdrawalAmount] = useState<number>(0);

  useEffect(() => {
    setWalletOperation((existingDetails: IWalletOperationProps) => ({
      ...existingDetails,
      fee: withdrawalFee,
      currency: activeWallet?.currency,
      amount: withdrawalAmount,
    }));
  }, [
    activeWallet?.currency,
    setWalletOperation,
    withdrawalAmount,
    withdrawalFee,
  ]);

  const handleCurrencyChange = (currency: string, options: any) => {
    const currencyBalance = userBalances.find(
      (walletBalance: any) => walletBalance.currency === currency
    );
    setactiveWallet({
      currency: currencyBalance?.currency || "",
      balance: currencyBalance?.amount || 0,
    });
    isCurrencySelected = true;
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

  return (
    <div>
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

      <PayoutChannelContainer userBalances={userWallets} />
    </div>
  );
}
