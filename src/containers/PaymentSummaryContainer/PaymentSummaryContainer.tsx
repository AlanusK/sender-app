import React, { useState } from "react";
import { Form, Row, Col } from "antd";
import { debounce, toDecimalMark } from "../../utility";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useAuthorisedContext } from "../../context/authorised-layout-context";
import { supportedCurrencies } from "../../constants";
import { userWalletsBalanceProps } from "../../types";

interface IPaymentSummaryContainerProps {
  userBalances: userWalletsBalanceProps[];
}

const PaymentSummaryContainer = ({
  userBalances,
}: IPaymentSummaryContainerProps) => {
  const screens = useBreakpoint();
  const { activeWallet, setactiveWallet, userWallets } = useAuthorisedContext();
  const [selectedCurrency, SetSelectedCurrency] = useState<any>(" ");
  const [validationStatus, SetValidationStatus] = useState<
    "" | "error" | "success" | "warning" | "validating"
  >("");
  const [helpMessage, setHelpMessage] = useState<string>("");
  const [hasSufficientBalance, SetHasSufficientBalance] = useState<boolean>(
    true
  );
  const [transferAmount, SetTransferAmount] = useState<number>(0);

  const balanceAmount = activeWallet.balance;
  let isCurrencySelected = activeWallet?.currency ? true : false;
  const minmumAmount =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.minTransfer || 0;
  const maxmumAmount =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.maxTransfer || 0;
  const transferFee =
    supportedCurrencies.find((curr) => curr.currency === activeWallet.currency)
      ?.transferFee || 0;

  const handleCurrencyChange = (currency: string, options: any) => {
    const currencyBalance = userBalances.find(
      (walletBalance: any) => walletBalance.currency === currency
    );
    setactiveWallet({
      currency: currencyBalance?.currency || "",
      balance: currencyBalance?.amount || 0,
    });
    SetSelectedCurrency(options);
    isCurrencySelected = true;
  };

  const handleAmountChange = (value: string) => {
    validateAmount(Number(value));
    validateWalletBalance(Number(value));
    const debouncedSetTransferAmount = debounce(SetTransferAmount, 1000);
    debouncedSetTransferAmount(Number(value) ? Number(value) : 0);
  };

  const validateWalletBalance = (value: number) => {
    if (value > balanceAmount) {
      SetHasSufficientBalance(false);
      return;
    }
    SetHasSufficientBalance(true);
  };

  const validateAmount = (value: number) => {
    if (value <= minmumAmount) {
      SetValidationStatus("error");
      setHelpMessage(
        `Min: ${supportedCurrencies.find(
          (curr) => curr.currency === activeWallet.currency
        )?.symbol
        }${toDecimalMark(minmumAmount + 1)}`
      );
      return;
    }
    if (value >= maxmumAmount) {
      SetValidationStatus("error");
      setHelpMessage(
        `Max: ${supportedCurrencies.find(
          (curr) => curr.currency === activeWallet.currency
        )?.symbol
        }${toDecimalMark(maxmumAmount)}`
      );
      return;
    }
    SetValidationStatus("success");
    setHelpMessage("");
  };

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
            {`${supportedCurrencies.find(
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
            {`${supportedCurrencies.find(
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
            {`${supportedCurrencies.find(
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
