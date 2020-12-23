import React, { useState } from 'react';
import { Form, Input, Button, Radio, Select, Row, Col, Tag } from 'antd';
import "./SendMoneyContainer.css";
import {
  DepositFormContainer,
  SelectCurrencyContainer,
} from "../../containers";
import { CustomCurrencyInput } from "../../components";
import { toDecimalMark } from "../../utility";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const SendMoneyContainer = () => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [isCurrencySelected, SetIsCurrencySelected] = useState<boolean>(false);
  const [selectedCurrency, SetSelectedCurrency] = useState<any>(" ");
  const [validationStatus, SetValidationStatus] = useState<
    "" | "error" | "success" | "warning" | "validating"
  >("");
  const [helpMessage, setHelpMessage] = useState<string>("");
  const [minmumAmount, SetMinmumAmount] = useState<number>(999);
  const [hasSufficientBalance, SetHasSufficientBalance] = useState<boolean>(
    true
  );
  const [withdrawalAmount, SetWithdrawalAmount] = useState<number>(0);
  const [withdrawalFee, SetwithdrawalFee] = useState<number>(2000);
  const [balanceAmount, SetBalanceAmount] = useState<number>(10000);

  const handleCurrencyChange = (currency: string, options: any) => {
    SetSelectedCurrency(options);
    SetIsCurrencySelected(true);
  };

  const handleAmountChange = (value: string) => {
    validateAmount(Number(value));
  };

  const validateAmount = (value: number) => {
    if (value <= minmumAmount) {
      SetValidationStatus("error");
      setHelpMessage(
        `Min: ${selectedCurrency.key}${toDecimalMark(minmumAmount + 1)}`
      );
      return;
    }
    SetValidationStatus("success");
    setHelpMessage("");
  };


  return (
    <>
      <h3 className="title">Send</h3>
      <hr className="line-top" />
      <Form
        form={form}
        layout={'vertical'}
      >
        <Row gutter={12}>
          <Col>
            <Form.Item
              label={<label style={{ color: "gray" }}>Wallet</label>}
            >
              <SelectCurrencyContainer onCurrencyChange={handleCurrencyChange} />
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
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label={<label style={{ color: "gray" }}>Amount</label>}
              validateStatus={validationStatus}
              help={helpMessage}
            >
              <CustomCurrencyInput
                prefix={selectedCurrency.key}
                disabled={!isCurrencySelected}
                onChange={handleAmountChange}
                height={32}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={<label style={{ color: "gray" }}>Payout method</label>}
          style={{width: screens.xs ? "200px" : "412px"}}
        >
          <Select disabled={!isCurrencySelected}>
            <Select.Option value='M-pesa Kenya'>M-pesa Kenya</Select.Option>
            <Select.Option value='M-pesa Tanzania'>M-pesa Tanzania</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<label style={{ color: "gray" }}>Mobile money number</label>}
          style={{width: screens.xs ? "200px" : "412px"}}
        >
          <Input placeholder="0763212347" disabled={!isCurrencySelected} />
        </Form.Item>

        <Form.Item
          label={<label style={{ color: "gray" }}>Name receiver</label>}
          style={{width: screens.xs ? "200px" : "412px"}}
        >
          <Input placeholder="John Doe" disabled={!isCurrencySelected} />
        </Form.Item>

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

        <hr className="line-bottom" />

        <Form.Item 
          className="form-item-button"
          style={{width: screens.xs ? "200px" : "412px"}}
        >
          <Button className="button" type="primary">Send</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SendMoneyContainer;