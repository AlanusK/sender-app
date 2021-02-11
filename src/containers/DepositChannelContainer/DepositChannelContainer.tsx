import React, { useState } from "react";
import { Form, Select } from "antd";
import "./DepositChannelContainer.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useAuthorisedContext } from "../../context/authorised-layout-context";
import { userWalletsBalanceProps } from "../../types";

interface ISendMoneyContainerProps {
  userBalances: userWalletsBalanceProps[];
}

const DepositChannelContainer = ({ userBalances }: ISendMoneyContainerProps) => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const { activeWallet } = useAuthorisedContext();

  const depositMethod = [
    { type: "MNO", name: "Airtel Money", value: "AIRTEL_MONEY", key: "AIRTEL_MONEY" },
    { type: "MNO", name: "Vodacom M-pesa", value: "VODACOM_MPESA", key: "VODACOM_MPESA" },
    { type: "MNO", name: "Tigopesa", value: "TIGOPESA", key: "TIGOPESA" },
    { type: "BANK", name: "Crdb", value: "CRDB", key: "CRDB" },
    { type: "BANK", name: "Nmb", value: "NMB", key: "NMB" },
  ];

  const [selectedDepositValue, setSelectedDepositValue] = useState<string>("");
  const [selectedDepositType, setSelectedDepositType] = useState<string>("");

  let isCurrencySelected = activeWallet?.currency ? true : false;

  return (
    <div className="deposit-channel-container-wrapper">
      <Form form={form} layout={"vertical"}>
        <Form.Item
          label={<label style={{ color: "gray" }}>Deposit method</label>}
          style={{ width: screens.xs ? "200px" : "412px" }}
          name="deposit-channel"
        >
          <Select
            disabled={!isCurrencySelected}
            onChange={(value: string, Option: any) => {
              console.log(value)
              setSelectedDepositValue(value)
              setSelectedDepositType(Option.type)
            }}
          >
            {depositMethod.map((deposit) =>
              <Select.Option value={deposit.value} key={deposit.key} type={deposit.type}>{deposit.name}</Select.Option>
            )}
          </Select>
        </Form.Item>

        {selectedDepositValue === "AIRTEL_MONEY" &&
          <Form.Item
            label={<label style={{ color: "gray" }}>Airtel Money</label>}
            style={{ width: screens.xs ? "200px" : "412px" }}
            name="receiving-mno-name"
          >
            <ul>
              <li>Dial *150*60#</li>
              <li>Choose Option 5 --- "Pay Bills" ("Lipia Bili")</li>
              <li>Choose Option 4 --- "Enter Business Number" ("Ingiza Namba ya Kampuni")</li>
              <li>Enter Business Number (Namba ya kampuni) --- 888999</li>
              <li>Enter Reference Number (Kumbu kumbu ya malipo)</li>
              <li>Enter Amount (Kiasi)</li>
            </ul>
          </Form.Item>
        }

        {selectedDepositValue === "VODACOM_MPESA" &&
          <Form.Item
            label={<label style={{ color: "gray" }}>Vodacom M-Pesa</label>}
            style={{ width: screens.xs ? "200px" : "412px" }}
            name="receiving-mno-name"
          >
            <ul>
              <li>Dial *150*00#</li>
              <li>Choose Option 4 --- "Pay by M-Pesa" ("Lipia kwa M-Pesa")</li>
              <li>Choose Option 4 --- "Enter Business Number" ("Weka namba ya Kampuni")</li>
              <li>Enter Business Number (Weka Namba ya kampuni) --- 888999</li>
              <li>Enter Reference Number (Weka Kumbu kumbu ya malipo)</li>
              <li>Enter your pin (Weka namba yako ya siri)</li>
              <li>Confirm Payment (Thibitisha malipo)</li>
            </ul>
          </Form.Item>
        }

        {selectedDepositValue === "TIGOPESA" &&
          <Form.Item
            label={<label style={{ color: "gray" }}>Tigo-Pesa</label>}
            style={{ width: screens.xs ? "200px" : "412px" }}
            name="receiving-mno-name"
          >
            <ul>
              <li>Dial *150*01#</li>
              <li>Choose Option 4 --- "Pay Bills" ("Lipia Bili")</li>
              <li>Choose Option 3 --- "Enter Business Number" ("Ingiza Namba ya Kampuni")</li>
              <li>Enter Business Number (Ingiza namba ya kampuni) --- 888999</li>
              <li>Enter Reference Number (Weka Kumbu kumbu namba)</li>
              <li>Enter Amount (Ingiza kiasi)</li>
              <li>Enter pin to confirm (Ingiza namba ya siri kuhakiki)</li>
            </ul>
          </Form.Item>
        }

        {selectedDepositType === "BANK" &&
          <Form.Item
            label={<h1 className="label-heading" ><strong>Bank Deposit</strong></h1>}
            style={{ width: screens.xs ? "200px" : "412px" }}
            name="receiving-bank-account-name"
          >
            <div className="display-content">
              <hr className="border-top-line" />
              <p>Please complete your deposit as soon as possible by transferring the total amount using instructions below:</p>
              <div className="bank-details">
                <div className="bank-details-line">
                  <h3>Bank details</h3>
                  <h3>CRDB</h3>
                </div>
                <div className="bank-details-line">
                  <h3>Account name</h3>
                  <h3>PAYCLICK LIMITED (TZS)</h3>
                </div>
                <div className="bank-details-line">
                  <h3>Account number</h3>
                  <h3>708000203</h3>
                </div>
                <div className="bank-details-line">
                  <h3>SWIFT</h3>
                  <h3>ECOCTZTZ</h3>
                </div>
                <div className="bank-details-line">
                  <h3>Amount</h3>
                  <h3>TZS 50,000.00</h3>
                </div>
                <div className="deposit-reference">
                  <div className="reference-left">
                    <h3>Deposit Reference</h3>
                    <p className="reference-description"> Must be included with your transfer</p>
                  </div>
                  <h3>DEP83409L5</h3>
                </div>
              </div>
              <h1 className="important-note" ><strong>IMPORTANT</strong></h1>
              <p>To help us make sure your deposit arrives in time and in full, please make sure to:</p>
              <p className="paragraph-one">1. Inform your bank that you wish to pay all possible transfers fees</p>
              <p>2. inform your bank that your deposit reference number must arrive with your transfer or your deposit won't be processed</p>
            </div>
          </Form.Item>
        }
      </Form>
    </div>
  );
};

export default DepositChannelContainer;
