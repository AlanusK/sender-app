import { Col, Form, Input, Row, Tag } from "antd";
import React, { useState } from "react";
import { SelectCurrencyContainer } from "..";
import { CustomCurrencyInput } from "../../components";
import { toDecimalMark } from "../../utility";
import "./DepositFormContainer.css";

interface IDepositFormProps {
  onValueChange?(): void;
}

export default function DepositFormContainer(props: IDepositFormProps) {
  const [isCurrencySelected, SetIsCurrencySelected] = useState<boolean>(false);
  const [selectedCurrency, SetSelectedCurrency] = useState<any>(" ");
  const [validationStatus, SetValidationStatus] = useState<
    "" | "error" | "success" | "warning" | "validating"
  >("");
  const [helpMessage, setHelpMessage] = useState<string>("");
  const [minmumAmount, SetMinmumAmount] = useState<number>(999);
  const [balanceAmount, SetBalanceAmount] = useState<number>(6000);
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
    <div>
      <Input.Group size="large">
        <Row gutter={[12, 12]}>
          <Col>
            <SelectCurrencyContainer
              onCurrencyChange={handleCurrencyChange}
              currencyOptions={[{ currency: "TZS" }]}
            />
            <p
              className={"account-balance-tag"}
              style={{ marginTop: 5 }}
              hidden={!isCurrencySelected}
            >
              <Tag color="default">
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
    </div>
  );
}
