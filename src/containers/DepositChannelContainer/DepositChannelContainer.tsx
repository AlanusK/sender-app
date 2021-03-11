import React, { useEffect, useState } from "react";
import { Button, Form, message, Result, Select, Spin } from "antd";
import "./DepositChannelContainer.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { bankDetails, IWalletOperationProps } from "../../types";
import {
  clickPesaBankAccountDetails,
  depositMethodOptions,
} from "../../constants";
import { toDecimalMark } from "../../utility";
import { useWalletOperationsContext } from "../../context/wallet-operations-context";
import { LoadingOutlined } from "@ant-design/icons";

const DepositChannelContainer = () => {
  const {
    walletOperation: {
      amount,
      referenceId,
      currency,
      processingError,
      processingStatus,
    },
    setWalletOperation,
  } = useWalletOperationsContext();
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [selectedDepositType, setSelectedDepositType] = useState<string>("");
  const [channelSelected, SetchannelSelected] = useState<boolean>(false);
  const [bankDepositDetails, setBankDepositDetails] = useState<bankDetails>();
  const [
    selectedMobileMoneyOption,
    setSelectedMobileMoneyOption,
  ] = useState<string>();

  // set deposit operation receiving account details
  useEffect(() => {
    if (bankDepositDetails) {
      setWalletOperation((existingDetails: IWalletOperationProps) => ({
        ...existingDetails,
        receivingAccount: {
          channel: "BANK DEPOSIT",
          channelProvider: bankDepositDetails.bankName,
          accountName: bankDepositDetails.accountName,
          accountNumber: bankDepositDetails.accountNumber,
          swiftNumber: bankDepositDetails.swiftNumber,
        },
      }));
    }
  }, [bankDepositDetails, selectedDepositType, setWalletOperation]);
  return (
    <div className="deposit-channel-container-wrapper">
      {["TZS", "KES"].includes(currency) && processingStatus === "idle" && (
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
                      (bank) => bank.currency === currency
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
                .filter((method) => method.currency === currency)
                .map((option) => (
                  <Select.Option
                    value={option.value}
                    key={option.key}
                    type={option.type}
                  >
                    {option.optionName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          {channelSelected && (
            <>
              {selectedDepositType === "BANK" ? (
                <Form.Item
                  style={{ width: screens.xs ? "200px" : "412px" }}
                  name="receiving-bank-account-name"
                >
                  <div className="display-content" style={{ marginTop: "5px" }}>
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
                          {currency} {toDecimalMark(amount || 0)}
                        </h3>
                      </div>
                      <div className="deposit-reference">
                        <div className="reference-left">
                          <h3>Deposit Reference</h3>
                          <span
                            style={{ fontSize: "12px" }}
                            className="important-note"
                          >
                            * must be included on your transfer
                          </span>
                        </div>

                        <h3>{referenceId}</h3>
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
                      <li>Enter Amount ({amount})</li>
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
      {processingStatus === "pending" && (
        <h3 style={{ margin: "10px auto" }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          {" Please wait..."}
        </h3>
      )}
      {processingStatus === "error" && (
        <Result
          status="error"
          title="Submission Failed"
          subTitle={processingError.toString()}
        ></Result>
      )}
      {processingStatus === "success" && (
        <Result
          status="success"
          title="Deposit Submitted Successfully!"
          subTitle="Please proceed with a bank deposit within 24hr."
        ></Result>
      )}
    </div>
  );
};

export default DepositChannelContainer;
