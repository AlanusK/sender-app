import React, { useEffect, useState } from "react";
import { Form, Row, Col, Tag } from "antd";
import "./SendMoneyContainer.css";
import {
  SelectCurrencyContainer,
  PayoutChannelContainer,
} from "../../containers";
import { CustomCurrencyInput } from "../../components";
import { debounce, toDecimalMark } from "../../utility";
import { useAuthorisedContext } from "../../context/authorised-user-context";
import { supportedCurrencies } from "../../constants";
import { IWalletOperationProps, userWalletsBalanceProps } from "../../types";
import { useWalletOperationsContext } from "../../context/wallet-operations-context";

interface ISendMoneyContainerProps {
  userBalances: userWalletsBalanceProps[];
}

const SendMoneyContainer = ({ userBalances }: ISendMoneyContainerProps) => {
  const [form] = Form.useForm();
  const { activeWallet, setactiveWallet, userWallets } = useAuthorisedContext();
  const { setWalletOperation } = useWalletOperationsContext();
  const [validationStatus, SetValidationStatus] = useState<
    "" | "error" | "success" | "warning" | "validating"
  >("");
  const [helpMessage, setHelpMessage] = useState<string>("");
  const [hasSufficientBalance, SetHasSufficientBalance] = useState<boolean>(
    true
  );
  const [transferAmount, SetTransferAmount] = useState<number>(0);

  const balanceAmount = activeWallet.balance;
  let isCurrencySelected = activeWallet?.currency ? true : false;
  const minmumAmount =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.minTransfer || 0;
  const maxmumAmount =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.maxTransfer || 0;
  const transferFee =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.transferFee || 0;

  useEffect(() => {
    setWalletOperation((existingDetails: IWalletOperationProps) => ({
      ...existingDetails,
      fee: transferFee,
      currency: activeWallet?.currency,
      amount: transferAmount,
    }));
  }, [activeWallet?.currency, setWalletOperation, transferAmount, transferFee]);

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
    const debouncedSetTransferAmount = debounce(SetTransferAmount, 1000);
    debouncedSetTransferAmount(Number(value) ? Number(value) : 0);
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
        `Min: ${
          supportedCurrencies.find(
            (curr) => curr.currency === activeWallet.currency
          )?.symbol
        }${toDecimalMark(minmumAmount + 1)}`
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
    <div className="send-money-container-wrapper">
      <Form form={form} layout={"vertical"}>
        <Row gutter={12}>
          <Col>
            <Form.Item label={<label style={{ color: "gray" }}>Wallet</label>}>
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
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label={<label style={{ color: "gray" }}>Amount</label>}
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
      </Form>
      <PayoutChannelContainer userBalances={userWallets} />
    </div>
  );
};

export default SendMoneyContainer;
