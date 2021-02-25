import React from "react";
import { Row, Col } from "antd";
import { toDecimalMark } from "../../utility";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { supportedCurrencies } from "../../constants";
import { useWalletOperationsContext } from "../../context/wallet-operations-context";

const PaymentSummaryContainer = () => {
  const screens = useBreakpoint();
  const {
    walletOperation: { fee, currency, amount },
  } = useWalletOperationsContext();
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
              supportedCurrencies.find((curr) => curr.currency === currency)
                ?.symbol
            } ${toDecimalMark(amount)}`}
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
              supportedCurrencies.find((curr) => curr.currency === currency)
                ?.symbol
            } ${toDecimalMark(fee)}`}
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
              supportedCurrencies.find((curr) => curr.currency === currency)
                ?.symbol
            } ${toDecimalMark(amount - fee < 0 ? 0 : amount - fee)}`}
          </h4>
        </Col>
      </Row>
    </>
  );
};

export default PaymentSummaryContainer;
