import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Radio, Select, Row, Col, Tag } from "antd";
import "./SendMoneyContainer.css";
import { SelectCurrencyContainer, PaymentSummaryContainer } from "../../containers";
import { CustomCurrencyInput } from "../../components";
import { debounce, toDecimalMark } from "../../utility";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useAuthorisedContext } from "../../context/authorised-layout-context";
import { supportedCurrencies } from "../../constants";
import { userWalletsBalanceProps } from "../../types";

interface ISendMoneyContainerProps {
  userBalances: userWalletsBalanceProps[];
  setSendMoneyFuncRef: any;
}

const SendMoneyContainer = ({
  userBalances,
  setSendMoneyFuncRef,
}: ISendMoneyContainerProps) => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const { activeWallet, setactiveWallet, userWallets } = useAuthorisedContext();
  const [selectedCurrency, SetSelectedCurrency] = useState<any>(" ");
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

  const handleCurrencyChange = (currency: string, options: any) => {
    const currencyBalance = userBalances.find(
      (walletBalance: any) => walletBalance.currency === currency
    );
    setactiveWallet({
      currency: currencyBalance?.currency || "",
      balance: currencyBalance?.amount || 0,
    });
    SetSelectedCurrency(options);
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

  const initiateSendingMoney = () => {
    const sendingData = {
      sendCurrency: selectedCurrency.value,
      sendingFee: transferFee,
      sendingChannel: "deade",
      sendAmount: transferAmount,
      receiverAccountNumber: "121212",
      receiverAccountName: "Mueewer",
    };
    console.log("Data to Send :>> ", sendingData);
  };

  // create reference for initiateSendingMoney function
  const sendMoneyFuncRef = useRef<any>(null);
  useEffect(() => {
    if (!!setSendMoneyFuncRef) {
      setSendMoneyFuncRef(sendMoneyFuncRef);
    }
  });
  sendMoneyFuncRef.current = initiateSendingMoney;

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

        <Form.Item
          label={<label style={{ color: "gray" }}>Payout method</label>}
          style={{ width: screens.xs ? "200px" : "412px" }}
          name="payment-channel"
        >
          <Select disabled={!isCurrencySelected}>
            <Select.Option value="M-pesa Kenya">M-pesa Kenya</Select.Option>
            <Select.Option value="M-pesa Tanzania">
              M-pesa Tanzania
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<label style={{ color: "gray" }}>Mobile money number</label>}
          style={{ width: screens.xs ? "200px" : "412px" }}
          name="receiving-account-number"
        >
          <Input placeholder="0763212347" disabled={!isCurrencySelected} />
        </Form.Item>

        <Form.Item
          label={<label style={{ color: "gray" }}>Name receiver</label>}
          style={{ width: screens.xs ? "200px" : "412px" }}
          name="receiving-account-name"
        >
          <Input placeholder="John Doe" disabled={!isCurrencySelected} />
        </Form.Item>

        {isCurrencySelected && <PaymentSummaryContainer userBalances={userWallets}/>}
      </Form>
    </div>
  );
};

export default SendMoneyContainer;
