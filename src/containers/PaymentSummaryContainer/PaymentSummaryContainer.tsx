import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { toDecimalMark } from "../../utility";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useAuthorisedContext } from "../../context/authorised-layout-context";
import { supportedCurrencies } from "../../constants";

interface IPaymentSummaryContainer {
  amount: number;
  feeAmount: number;
}
const PaymentSummaryContainer = ({
  amount,
  feeAmount,
}: IPaymentSummaryContainer) => {
  const screens = useBreakpoint();
  const { activeWallet } = useAuthorisedContext();
  const [transferAmount, SetTransferAmount] = useState<number>(0);
  const [transferFee, settransferFee] = useState(0);

  useEffect(() => {
    if (!!amount) {
      SetTransferAmount(amount);
      settransferFee(feeAmount);
    }
  }, [amount, feeAmount]);

  return (
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
            {`${
              supportedCurrencies.find(
                (curr) => curr.currency === activeWallet.currency
              )?.symbol
            } ${toDecimalMark(transferAmount)}`}
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
            {`${
              supportedCurrencies.find(
                (curr) => curr.currency === activeWallet.currency
              )?.symbol
            } ${toDecimalMark(transferFee)}`}
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
            {`${
              supportedCurrencies.find(
                (curr) => curr.currency === activeWallet.currency
              )?.symbol
            } ${toDecimalMark(
              transferAmount - transferFee < 0
                ? 0
                : transferAmount - transferFee
            )}`}
          </h4>
        </Col>
      </Row>
    </>
  );
};

export default PaymentSummaryContainer;
