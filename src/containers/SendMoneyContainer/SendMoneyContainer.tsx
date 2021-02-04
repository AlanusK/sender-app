import React, { useEffect, useState } from "react";
import { Form, Input, Select, Row, Col, Tag } from "antd";
import "./SendMoneyContainer.css";
import {
  SelectCurrencyContainer,
  PaymentSummaryContainer,
} from "../../containers";
import { CustomCurrencyInput } from "../../components";
import { debounce, toDecimalMark } from "../../utility";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useAuthorisedContext } from "../../context/authorised-layout-context";
import { supportedCurrencies } from "../../constants";
import { userWalletsBalanceProps } from "../../types";
import { usePayoutContext } from "../../context/payout-context";

interface ISendMoneyContainerProps {
  userBalances: userWalletsBalanceProps[];
}

const SendMoneyContainer = ({ userBalances }: ISendMoneyContainerProps) => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const { activeWallet, setactiveWallet, userWallets } = useAuthorisedContext();
  const {
    SetPayoutAmount,
    SetPayoutCurrency,
    SetFeeAmount,
  } = usePayoutContext();
  const [validationStatus, SetValidationStatus] = useState<
    "" | "error" | "success" | "warning" | "validating"
  >("");
  const [helpMessage, setHelpMessage] = useState<string>("");
  const [hasSufficientBalance, SetHasSufficientBalance] = useState<boolean>(
    true
  );
  const [transferAmount, SetTransferAmount] = useState<number>(0);

  const payoutMethod = [
    { type: "MNO", name: "M-pesa Kenya", value: "MPESA_KENYA", key: "MPESA_KENYA" },
    { type: "MNO", name: "M-pesa Tanzania", value: "MPESA_TANZANIA", key: "MPESA_TANZANIA" },
    { type: "MNO", name: "Tigopesa", value: "TIGOPESA", key: "TIGOPESA" },
    { type: "BANK", name: "Crdb", value: "CRDB", key: "CRDB" },
    { type: "BANK", name: "Nmb", value: "NMB", key: "NMB" },
  ];

  const [selectedMNO, setSelectedMNO] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<boolean>(false);

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
    SetFeeAmount(transferFee);
  }, [SetFeeAmount, transferFee]);

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

  useEffect(() => {
    SetPayoutCurrency(activeWallet?.currency);
  }, [SetPayoutCurrency, activeWallet?.currency]);

  const handleAmountChange = (value: string) => {
    validateAmount(Number(value));
    validateWalletBalance(Number(value));
    const debouncedSetTransferAmount = debounce(SetTransferAmount, 1000);
    debouncedSetTransferAmount(Number(value) ? Number(value) : 0);
  };

  useEffect(() => {
    SetPayoutAmount(transferAmount);
  }, [SetPayoutAmount, transferAmount]);

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

        <Form.Item
          label={<label style={{ color: "gray" }}>Payout method</label>}
          style={{ width: screens.xs ? "200px" : "412px" }}
          name="payment-channel"
        >
          <Select
            disabled={!isCurrencySelected}
            onChange={(value) => {
              if (value == "CRDB" || value == "NMB") {
                setSelectedBank(true)
                setSelectedMNO(false)
              }  
              else {
                setSelectedBank(false)
                setSelectedMNO(true)
              }
            }}
          >
            {payoutMethod.map((payout) =>
              <Select.Option value={payout.value}>{payout.name}</Select.Option>
            )}
          </Select>
        </Form.Item>

        {selectedMNO &&
          <>
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
          </>
        }

        {selectedBank &&
          <>
            <Form.Item
              label={<label style={{ color: "gray" }}>Account Name</label>}
              style={{ width: screens.xs ? "200px" : "412px" }}
              name="receiving-account-name"
            >
              <Input placeholder="Paul John" disabled={!isCurrencySelected} />
            </Form.Item>

            <Form.Item
              label={<label style={{ color: "gray" }}>Account Number</label>}
              style={{ width: screens.xs ? "200px" : "412px" }}
              name="receiving-account-number"
            >
              <Input placeholder="01523455322" disabled={!isCurrencySelected} />
            </Form.Item>

            <Form.Item
              label={<label style={{ color: "gray" }}>Swift code</label>}
              style={{ width: screens.xs ? "200px" : "412px" }}
              name="receiving-account-swiftcode"
            >
              <Input placeholder="EQBLTZTZ" disabled={!isCurrencySelected} />
            </Form.Item>
          </>
        }

        {isCurrencySelected && <PaymentSummaryContainer />}
      </Form>
    </div>
  );
};

export default SendMoneyContainer;
