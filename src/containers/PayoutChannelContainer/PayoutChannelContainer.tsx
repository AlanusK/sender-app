import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import "./PayoutChannelContainer.css";
import { PaymentSummaryContainer } from "..";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useAuthorisedContext } from "../../context/authorised-user-context";
import { IPayoutMethodsProps, IWalletOperationProps } from "../../types";
import { maximumMobileWithdrawalAmount, payoutMethod } from "../../constants";
import { useWalletOperationsContext } from "../../context/wallet-operations-context";
import PhoneInput from "react-phone-input-2";
import { toDecimalMark } from "../../utility";

const PayoutChannelContainer = () => {
  const { activeWallet } = useAuthorisedContext();
  const {
    setWalletOperation,
    walletOperation: { amount, currency, receivingAccount },
    requirePassword,
  } = useWalletOperationsContext();
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [selectedPayoutType, setSelectedPayoutType] = useState<string>("");
  const [
    isPayoutChannelSelected,
    setIsPayoutChannelSelected,
  ] = useState<boolean>(false);

  const [channelProvider, setChannelProvider] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [swiftNumber, setSwiftNumber] = useState<string>("");
  const [withdrawalFee, setWithdrawalFee] = useState<number>(0);

  useEffect(() => {
    const rangeCheck = (amount: number, min: number, max: number) =>
      amount >= min && amount <= max;
    switch (currency) {
      case "TZS":
        if (selectedPayoutType === "BANK") {
          return setWithdrawalFee(amount > 4999999 ? 15000 : 4000);
        }
        // TZS mobile money fee
        setWithdrawalFee(4000);
        break;
      case "KES":
        if (selectedPayoutType === "BANK") {
          if (rangeCheck(amount, 50, 99999) === true)
            return setWithdrawalFee(40);
          if (rangeCheck(amount, 100000, 249999) === true)
            return setWithdrawalFee(60);
          if (rangeCheck(amount, 250000, 499999) === true)
            return setWithdrawalFee(100);
          if (rangeCheck(amount, 500000, 999999) === true)
            return setWithdrawalFee(150);
          if (amount > 999999) return setWithdrawalFee(850);
        }
        //KES mobile money fee
        if (rangeCheck(amount, 1500, 70000) === true)
          return setWithdrawalFee(80);
        if (rangeCheck(amount, 1000, 1499) === true)
          return setWithdrawalFee(60);
        if (rangeCheck(amount, 50, 999) === true) return setWithdrawalFee(40);

        break;
      default:
        break;
    }
  }, [selectedPayoutType, amount, currency]);

  useEffect(() => {
    setWalletOperation((existingDetails: IWalletOperationProps) => ({
      ...existingDetails,
      fee: withdrawalFee,
      receivingAccount: {
        channel:
          selectedPayoutType === "BANK"
            ? "BANK TRANSFER"
            : selectedPayoutType === "MNO"
            ? "MOBILE MONEY"
            : "WALLET TRANSFER",
        channelProvider: channelProvider,
        accountName: accountName,
        accountNumber: accountNumber,
        swiftNumber: swiftNumber,
      },
    }));
  }, [
    accountName,
    accountNumber,
    channelProvider,
    selectedPayoutType,
    setWalletOperation,
    swiftNumber,
    withdrawalFee,
  ]);
  return (
    <div className="payout-channel-container-wrapper">
      {!requirePassword && (
        <Form form={form} layout={"vertical"}>
          <Form.Item
            label={<label style={{ color: "gray" }}>Via</label>}
            style={{ width: screens.xs ? "200px" : "412px" }}
            name="payment-channel"
            validateStatus={
              receivingAccount.channel === "MOBILE MONEY" &&
              amount > maximumMobileWithdrawalAmount(currency)
                ? "error"
                : ""
            }
            help={
              receivingAccount.channel === "MOBILE MONEY" &&
              amount > maximumMobileWithdrawalAmount(currency)
                ? `Maximum withdrawal via mobile money is ${currency}  ${toDecimalMark(
                    maximumMobileWithdrawalAmount(currency)
                  )}`
                : ""
            }
          >
            <Select
              onChange={(value, option: any) => {
                option.type === "MNO"
                  ? setSelectedPayoutType("MNO")
                  : setSelectedPayoutType("BANK");
                setIsPayoutChannelSelected(true);
                setChannelProvider(option.value);
                setAccountName("");
                setAccountNumber("");
                setSwiftNumber("");
              }}
              placeholder="Select Payout Channel"
            >
              {payoutMethod
                .filter(
                  (method: IPayoutMethodsProps) =>
                    (method.type === "MNO" || method.type === "BANK") &&
                    method.currency === activeWallet.currency
                )
                .map((payout) => (
                  <Select.Option
                    value={payout.value}
                    key={payout.key}
                    type={payout.type}
                  >
                    {payout.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          {selectedPayoutType === "MNO" && (
            <>
              <Form.Item
                label={<label style={{ color: "gray" }}>Mobile Number</label>}
                style={{ width: screens.xs ? "200px" : "412px" }}
                name="receiving-account-number"
              >
                <PhoneInput
                  country={activeWallet.currency === "TZS" ? "tz" : "ke"}
                  countryCodeEditable={false}
                  onChange={(value) => setAccountNumber(value.toString())}
                  inputStyle={{ height: 32, width: "100%" }}
                  masks={{ tz: "(...) ... ...", ke: "(...) ... ..." }}
                  inputClass="ant-input"
                  specialLabel={""}
                />
              </Form.Item>

              <Form.Item
                label={<label style={{ color: "gray" }}>Receiver Name</label>}
                style={{ width: screens.xs ? "200px" : "412px" }}
                name="receiving-account-name"
              >
                <Input
                  onChange={(e: any) =>
                    setAccountName(e.target.value.toString())
                  }
                />
              </Form.Item>
            </>
          )}

          {selectedPayoutType === "BANK" && (
            <>
              <Form.Item
                label={<label style={{ color: "gray" }}>Bank Name</label>}
                style={{ width: screens.xs ? "200px" : "412px" }}
                name="bank-name"
              >
                <Input
                  onChange={(e: any) =>
                    setChannelProvider(e.target.value.toString())
                  }
                />
              </Form.Item>

              <Form.Item
                label={<label style={{ color: "gray" }}>Account Name</label>}
                style={{ width: screens.xs ? "200px" : "412px" }}
                name="account-name"
              >
                <Input
                  onChange={(e: any) =>
                    setAccountName(e.target.value.toString())
                  }
                />
              </Form.Item>

              <Form.Item
                label={<label style={{ color: "gray" }}>Account Number</label>}
                style={{ width: screens.xs ? "200px" : "412px" }}
                name="account-number"
              >
                <Input
                  onChange={(e: any) =>
                    setAccountNumber(e.target.value.toString())
                  }
                />
              </Form.Item>

              <Form.Item
                label={<label style={{ color: "gray" }}>Swift code</label>}
                style={{ width: screens.xs ? "200px" : "412px" }}
                name="swiftcode"
              >
                <Input
                  onChange={(e: any) =>
                    setSwiftNumber(e.target.value.toString())
                  }
                />
              </Form.Item>
            </>
          )}

          {selectedPayoutType === "WALLETADDRESS" && (
            <Form.Item
              label={<label style={{ color: "gray" }}>Clickpesa address</label>}
              style={{ width: screens.xs ? "200px" : "412px" }}
              name="receiving-account-clickpesa-address"
            >
              <Input placeholder=" example*clickpesa.com" />
            </Form.Item>
          )}

          {isPayoutChannelSelected && <PaymentSummaryContainer />}
        </Form>
      )}
    </div>
  );
};

export default PayoutChannelContainer;
