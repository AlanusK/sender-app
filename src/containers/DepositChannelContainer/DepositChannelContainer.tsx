import React, { useState } from "react";
import { Form, Select } from "antd";
import "./DepositChannelContainer.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { bankDetails } from "../../types";
import { clickPesaBankAccountDetails } from "../../constants";
import { toDecimalMark } from "../../utility";

interface IDepositChannelContainerProps {
  depositAmount: number;
  depositCurrency: string;
}

const depositMethodOptions = [
  {
    type: "MNO",
    currency: "TZS",
    name: "Airtel Money",
    value: "AIRTEL_MONEY",
    key: "AIRTEL_MONEY",
  },
  {
    type: "MNO",
    currency: "TZS",
    name: "Vodacom MPesa",
    value: "VODACOM_MPESA",
    key: "VODACOM_MPESA",
  },
  {
    type: "MNO",
    currency: "TZS",
    name: "TigoPesa",
    value: "TIGOPESA",
    key: "TIGOPESA",
  },
  {
    type: "BANK",
    currency: "KES",
    name: "Equity Bank Kenya",
    value: "EQUITY",
    key: "EQUITY",
  },
  {
    type: "BANK",
    currency: "TZS",
    name: "Ecobank Tanzania",
    value: "ECOBANK",
    key: "ECOBANK",
  },
];

const DepositChannelContainer = ({
  depositAmount,
  depositCurrency,
}: IDepositChannelContainerProps) => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [selectedDepositType, setSelectedDepositType] = useState<string>("");
  const [channelSelected, SetchannelSelected] = useState<boolean>(false);
  const [bankDepositDetails, setBankDepositDetails] = useState<bankDetails>();
  const [
    selectedMobileMoneyOption,
    setSelectedMobileMoneyOption,
  ] = useState<string>();
  return (
    <div className="deposit-channel-container-wrapper">
      {["TZS", "KES"].includes(depositCurrency || "") && (
        <Form form={form} layout={"vertical"}>
          <Form.Item
            style={{ width: screens.xs ? "200px" : "412px" }}
            name="deposit-channel"
          >
            <Select
              placeholder="Select Deposit Channel"
              onChange={(value: string, Option: any) => {
                if (Option.type === "BANK") {
                  setBankDepositDetails(() =>
                    clickPesaBankAccountDetails.find(
                      (bank) => bank.currency === depositCurrency
                    )
                  );
                } else {
                  setSelectedMobileMoneyOption(value);
                }
                SetchannelSelected(true);
                setSelectedDepositType(Option.type);
              }}
            >
              {depositMethodOptions
                .filter((method) => method.currency === depositCurrency)
                .map((option) => (
                  <Select.Option
                    value={option.value}
                    key={option.key}
                    type={option.type}
                  >
                    {option.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          {channelSelected && (
            <>
              {selectedDepositType === "BANK" ? (
                <Form.Item
                  /*  label={
                    <h1 className="label-heading">
                      <strong>Bank Deposit</strong>
                    </h1>
                  } */
                  style={{ width: screens.xs ? "200px" : "412px" }}
                  name="receiving-bank-account-name"
                >
                  <div className="display-content" style={{ marginTop: "5px" }}>
                    {/*          <hr className="border-top-line" /> */}
                    <p>
                      Please complete your deposit as soon as possible by
                      transferring the total amount using instructions below:
                    </p>
                    <div className="bank-details">
                      <div className="bank-details-line">
                        <h3>Bank details</h3>
                        <h3>{bankDepositDetails?.bankName}</h3>
                      </div>
                      <div className="bank-details-line">
                        <h3>Account name</h3>
                        <h3>{bankDepositDetails?.accountName}</h3>
                      </div>
                      <div className="bank-details-line">
                        <h3>Account number</h3>
                        <h3>{bankDepositDetails?.accountNumber}</h3>
                      </div>
                      <div className="bank-details-line">
                        <h3>SWIFT</h3>
                        <h3>{bankDepositDetails?.swiftNumber}</h3>
                      </div>
                      <div className="bank-details-line">
                        <h3>Amount</h3>
                        <h3>
                          {depositCurrency} {toDecimalMark(depositAmount || 0)}
                        </h3>
                      </div>
                      <div className="deposit-reference">
                        <div className="reference-left">
                          <h3>Deposit Reference</h3>
                          <span style={{ fontSize: "12px", color: "red" }}>
                            * must be included on your transfer
                          </span>
                        </div>

                        <h3>DEP83409L5</h3>
                      </div>
                    </div>
                    <h3 className="important-note">
                      <strong>IMPORTANT</strong>
                    </h3>
                    <p>
                      To help us make sure your deposit arrives in time and in
                      full, please make sure to:
                    </p>
                    <p className="paragraph-one">
                      1. Inform your bank that you wish to pay all possible
                      transfers fees
                    </p>
                    <p>
                      2. Inform your bank that your deposit reference number
                      must arrive with your transfer or your deposit won't be
                      processed
                    </p>
                  </div>
                </Form.Item>
              ) : (
                <Form.Item
                  style={{ width: screens.xs ? "200px" : "412px" }}
                  name="receiving-mno-name"
                >
                  {selectedMobileMoneyOption === "AIRTEL_MONEY" && (
                    <ul>
                      <li>Dial *150*60#</li>
                      <li>Choose Option 5 --- "Pay Bills" ("Lipia Bili")</li>
                      <li>
                        Choose Option 4 --- "Enter Business Number" ("Ingiza
                        Namba ya Kampuni")
                      </li>
                      <li>
                        Enter Business Number (Namba ya kampuni) --- 888999
                      </li>
                      <li>Enter Reference Number (Kumbu kumbu ya malipo)</li>
                      <li>Enter Amount ({depositAmount})</li>
                    </ul>
                  )}
                  {selectedMobileMoneyOption === "VODACOM_MPESA" && (
                    <ul>
                      <li>Dial *150*00#</li>
                      <li>
                        Choose Option 4 --- "Pay by M-Pesa" ("Lipia kwa M-Pesa")
                      </li>
                      <li>
                        Choose Option 4 --- "Enter Business Number" ("Weka namba
                        ya Kampuni")
                      </li>
                      <li>
                        Enter Business Number (Weka Namba ya kampuni) --- 888999
                      </li>
                      <li>
                        Enter Reference Number (Weka Kumbu kumbu ya malipo)
                      </li>
                      <li>Enter your pin (Weka namba yako ya siri)</li>
                      <li>Confirm Payment (Thibitisha malipo)</li>
                    </ul>
                  )}
                  {selectedMobileMoneyOption === "TIGOPESA" && (
                    <ul>
                      <li>Dial *150*01#</li>
                      <li>Choose Option 4 --- "Pay Bills" ("Lipia Bili")</li>
                      <li>
                        Choose Option 3 --- "Enter Business Number" ("Ingiza
                        Namba ya Kampuni")
                      </li>
                      <li>
                        Enter Business Number (Ingiza namba ya kampuni) ---
                        888999
                      </li>
                      <li>Enter Reference Number (Weka Kumbu kumbu namba)</li>
                      <li>Enter Amount (Ingiza kiasi)</li>
                      <li>
                        Enter pin to confirm (Ingiza namba ya siri kuhakiki)
                      </li>
                    </ul>
                  )}
                </Form.Item>
              )}
            </>
          )}
        </Form>
      )}
    </div>
  );
};

export default DepositChannelContainer;
