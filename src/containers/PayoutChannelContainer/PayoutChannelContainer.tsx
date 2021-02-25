import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import "./PayoutChannelContainer.css";
import { PaymentSummaryContainer } from "..";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useAuthorisedContext } from "../../context/authorised-user-context";
import { userWalletsBalanceProps } from "../../types";

interface ISendMoneyContainerProps {
  userBalances: userWalletsBalanceProps[];
}

const PayoutChannelContainer = ({ userBalances }: ISendMoneyContainerProps) => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const { activeWallet } = useAuthorisedContext();

  const payoutMethod = [
    { type: "MNO", name: "M-pesa Kenya", value: "MPESA_KENYA", key: "MPESA_KENYA" },
    { type: "MNO", name: "M-pesa Tanzania", value: "MPESA_TANZANIA", key: "MPESA_TANZANIA" },
    { type: "MNO", name: "Tigopesa", value: "TIGOPESA", key: "TIGOPESA" },
    { type: "BANK", name: "Crdb", value: "CRDB", key: "CRDB" },
    { type: "BANK", name: "Nmb", value: "NMB", key: "NMB" },
    { type: "CLICKPESA", name: "Clickpesa", value: "CLICKPESA", key: "CLICKPESA" },
  ];

  const [selectedPayoutType, setSelectedPayoutType] = useState<string>("");

  let isCurrencySelected = activeWallet?.currency ? true : false;

  return (
    <div className="payout-channel-container-wrapper">
      <Form form={form} layout={"vertical"}>
        <Form.Item
          label={<label style={{ color: "gray" }}>Payout method</label>}
          style={{ width: screens.xs ? "200px" : "412px" }}
          name="payment-channel"
        >
          <Select
            disabled={!isCurrencySelected}
            onChange={(value, option: any) => {
              option.type === "MNO" ? setSelectedPayoutType("MNO") : setSelectedPayoutType(option.type === "BANK" ? "BANK" : "CLICKPESA")
            }}
          >
            {payoutMethod.map((payout) =>
              <Select.Option value={payout.value} key={payout.key} type={payout.type}>{payout.name}</Select.Option>
            )}
          </Select>
        </Form.Item>

        {selectedPayoutType === "MNO" &&
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

        {selectedPayoutType === "BANK" &&
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

        {selectedPayoutType === "CLICKPESA" &&
          <Form.Item
            label={<label style={{ color: "gray" }}>Clickpesa address</label>}
            style={{ width: screens.xs ? "200px" : "412px" }}
            name="receiving-account-clickpesa-address"
          >
            <Input placeholder="Clickpesa Limited" disabled={!isCurrencySelected} />
          </Form.Item>
        }

        {isCurrencySelected && <PaymentSummaryContainer />}
      </Form>
    </div>
  );
};

export default PayoutChannelContainer;
