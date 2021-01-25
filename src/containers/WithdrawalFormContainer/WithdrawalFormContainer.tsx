import { Col, Form, Input, Row, Tag } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { useState } from "react";
import { SelectCurrencyContainer } from "..";
import { CustomCurrencyInput } from "../../components";
import { debounce, toDecimalMark } from "../../utility";

import "./WithdrawalFormContainer.css";

export default function WithdrawalFormContainer() {
  const screens = useBreakpoint();
  const [isCurrencySelected, SetIsCurrencySelected] = useState<boolean>(false);
  const [selectedCurrency, SetSelectedCurrency] = useState<any>(" ");
  const [validationStatus, SetValidationStatus] = useState<
    "" | "error" | "success" | "warning" | "validating"
  >("");
  const [helpMessage, setHelpMessage] = useState<string>("");
  const [minmumAmount, SetMinmumAmount] = useState<number>(999);
  const [maxmumAmount, SetMaxmumAmount] = useState<number>(1000000);
  const [balanceAmount, SetBalanceAmount] = useState<number>(6000);
  const [hasSufficientBalance, SetHasSufficientBalance] = useState<boolean>(
    true
  );
  const [withdrawalAmount, SetWithdrawalAmount] = useState<number>(0);
  const [withdrawalFee, SetwithdrawalFee] = useState<number>(2000);
  const handleCurrencyChange = (currency: string, options: any) => {
    SetSelectedCurrency(options);
    SetIsCurrencySelected(true);
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
        `Min: ${selectedCurrency.key}${toDecimalMark(minmumAmount + 1)}`
      );
      return;
    }
    if (value >= maxmumAmount) {
      SetValidationStatus("error");
      setHelpMessage(
        `Max: ${selectedCurrency.key}${toDecimalMark(maxmumAmount)}`
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
            <SelectCurrencyContainer onCurrencyChange={handleCurrencyChange} currencyOptions={[{currency:'TZS'}]} />
            <p
              className={"account-balance-tag"}
              style={{ marginTop: 5 }}
              hidden={!isCurrencySelected}
            >
              <Tag color={hasSufficientBalance ? "green" : "red"}>
                {`Balance: ${selectedCurrency.key}${toDecimalMark(
                  balanceAmount
                )}`}
              </Tag>
            </p>
          </Col>
          <Col>
            <Form.Item validateStatus={validationStatus} help={helpMessage}>
              <CustomCurrencyInput
                prefix={selectedCurrency.key}
                disabled={!isCurrencySelected}
                onChange={handleAmountChange}
                height={32}
              />
            </Form.Item>
          </Col>
        </Row>
      </Input.Group>
      {isCurrencySelected && (
        <>
          <Row gutter={[12, 12]}>
            <Col style={{ width: 200 }}>
              <h4 className="summary-label">Amount</h4>
            </Col>
            <Col
              style={{
                textAlign: screens.xs ? "unset" : "right",
                marginLeft: screens.xs ? "unset" : 20,
                width: 200,
              }}
            >
              <h4 style={{ fontFamily: "Circular-Bold" }}>
                {`${selectedCurrency.key} ${toDecimalMark(withdrawalAmount)}`}
              </h4>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col style={{ width: 200 }}>
              <h4 className="summary-label">Fee</h4>
            </Col>
            <Col
              style={{
                textAlign: screens.xs ? "unset" : "right",
                marginLeft: screens.xs ? "unset" : 20,
                width: 200,
              }}
            >
              <h4 style={{ fontFamily: "Circular-Bold" }}>
                {`${selectedCurrency.key} ${toDecimalMark(withdrawalFee)}`}
              </h4>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col style={{ width: 200 }}>
              <h4 className="summary-label">Net-Payout Amount</h4>
            </Col>
            <Col
              style={{
                textAlign: screens.xs ? "unset" : "right",
                marginLeft: screens.xs ? "unset" : 20,
                width: 200,
              }}
            >
              <h4 style={{ fontFamily: "Circular-Bold" }}>
                {`${selectedCurrency.key} ${toDecimalMark(
                  withdrawalAmount - withdrawalFee
                )}`}
              </h4>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
