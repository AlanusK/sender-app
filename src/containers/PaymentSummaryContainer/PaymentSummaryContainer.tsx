import React from "react";
import { Row, Col } from "antd";
import { toDecimalMark } from "../../utility";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { supportedCurrencies } from "../../constants";
import { usePayoutContext } from "../../context/payout-context";

const PaymentSummaryContainer = () => {
  const screens = useBreakpoint();
  const { payoutAmount, payoutCurrency, payoutFee } = usePayoutContext();
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
                (curr) => curr.currency === payoutCurrency
              )?.symbol
            } ${toDecimalMark(payoutAmount)}`}
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
                (curr) => curr.currency === payoutCurrency
              )?.symbol
            } ${toDecimalMark(payoutFee)}`}
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
                (curr) => curr.currency === payoutCurrency
              )?.symbol
            } ${toDecimalMark(
              payoutAmount - payoutFee < 0 ? 0 : payoutAmount - payoutFee
            )}`}
          </h4>
        </Col>
      </Row>
    </>
  );
};

export default PaymentSummaryContainer;
