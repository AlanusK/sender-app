import { Descriptions, Badge } from "antd";
import React, { useEffect, useState } from "react";
import { IndividualTransactionsProps } from "../../types";
import { toDecimalMark } from "../../utility";
import "./IndividualTransactionsContainer.css";

interface TransactionDataProps {
  data: IndividualTransactionsProps;
}

const IndividualTransactionsContainer = ({ data }: TransactionDataProps) => {
  const {
    status,
    meta: { reference_id, deposit, payout_info, fee },
    amount,
    date,
    type,
  } = data;
  const [moreInfoDetails, setMoreInfoDetails] = useState<any>();

  useEffect(() => {
    switch (type) {
      case "Withdraw":
        if (status === "PROCESSING") {
          setMoreInfoDetails(() => (
            <div>
              <p>Funds Received</p>
              <Descriptions.Item label="Receiving Account">
                <p>{`Total amount will be settled into your  ${payout_info.payout_channel_provider} account below:`}</p>
                <span className="desc-inline-label">Account Name: </span>
                {payout_info.payout_address_name}
                <br />
                <span className="desc-inline-label">Account Number: </span>
                {payout_info.payout_address}
                <br />
                <span className="desc-inline-label">Amount: </span>
                {payout_info.currency +
                  " " +
                  toDecimalMark(Number(payout_info.amount))}
                <br />
                <span className="desc-inline-label">ETA: </span>
                {"24hr"}
              </Descriptions.Item>
            </div>
          ));
        }
        if (status === "UNAUTHORIZED") {
          setMoreInfoDetails(() => (
            <div>
              <p>Funds Not Received</p>
              <p>Withdrawal Authorization Required.</p>
            </div>
          ));
        }
        if (status === "SUCCESS") {
          setMoreInfoDetails(() => (
            <div>
              <p>Withdrawal Completed</p>
              <Descriptions.Item label="Receiving Account">
                <p>{`Total amount was settled into your  ${payout_info.payout_channel_provider} account below:`}</p>
                <span className="desc-inline-label">Account Name: </span>
                {payout_info.payout_address_name}
                <br />
                <span className="desc-inline-label">Account Number: </span>
                {payout_info.payout_address}
                <br />
                <span className="desc-inline-label">Amount: </span>
                {payout_info.currency +
                  " " +
                  toDecimalMark(Number(payout_info.amount))}
                <br />
                <span className="desc-inline-label">ETA: </span>
                {"24hr"}
              </Descriptions.Item>
            </div>
          ));
        }
        break;
      case "Deposit":
        if (status === "PENDING") {
          setMoreInfoDetails(() => (
            <div>
              <div className="display-content" style={{ marginTop: "5px" }}>
                <p>Transaction pending bank deposit.</p>
                <p>
                  Please complete your deposit as soon as possible by
                  transferring the total amount using instructions below:
                </p>
                <div className="bank-details">
                  <div className="bank-details-line">
                    <h3>Bank details</h3>
                    <h3>{deposit?.channel_provider}</h3>
                  </div>
                  <div className="bank-details-line">
                    <h3>Account name</h3>
                    <h3>{deposit?.account_name}</h3>
                  </div>
                  <div className="bank-details-line">
                    <h3>Account number</h3>
                    <h3>{deposit?.account_address}</h3>
                  </div>
                  <div className="bank-details-line">
                    <h3>SWIFT</h3>
                    <h3>
                      {deposit?.account_currency === "KES"
                        ? "EQBLKENA"
                        : "ECOCTZTZ"}
                    </h3>
                  </div>
                  <div className="bank-details-line">
                    <h3>Amount</h3>
                    <h3>{amount}</h3>
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

                    <h3>{reference_id}</h3>
                  </div>
                </div>
                <h3 className="important-note">
                  <strong>IMPORTANT</strong>
                </h3>
                <p>
                  To help us make sure your deposit arrives in time and in full,
                  please make sure to:
                </p>
                <p className="paragraph-one">
                  1. Inform your bank that you wish to pay all possible
                  transfers fees
                </p>
                <p>
                  2. Inform your bank that your deposit reference number must
                  arrive with your transfer or your deposit won't be processed
                </p>
              </div>
            </div>
          ));
        }
        if (status === "PROCESSING") {
          setMoreInfoDetails(() => (
            <div>
              <p>Bank Deposit Received</p>
              <p>Settlement into your wallet will be done shortly.</p>
            </div>
          ));
        }
        if (status === "SUCCESS") {
          setMoreInfoDetails(() => (
            <div>
              <p>Deposit Complete</p>
              <p>Total amount was deposited succesful into your wallet.</p>
            </div>
          ));
        }
        if (status === "FAILED") {
          setMoreInfoDetails(() => (
            <div>
              <p>Deposit Failed</p>
            </div>
          ));
        }
        break;
      default:
        break;
    }
  }, [status, type]);

  return (
    <div className="content-individual-transactions">
      <Descriptions
        layout="vertical"
        bordered
        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        size="small"
        style={{ width: "100%" }}
      >
        <Descriptions.Item label="Date">{date}</Descriptions.Item>
        <Descriptions.Item label="Amount">{amount}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Badge
            status={
              status === "PENDING"
                ? "default"
                : status === "PROCESSING"
                ? "processing"
                : status === "UNAUTHORIZED"
                ? "error"
                : "success"
            }
            color={
              status === "PENDING"
                ? "silver"
                : status === "PROCESSING"
                ? "volcano"
                : status === "UNAUTHORIZED"
                ? "red"
                : "green"
            }
            text={data.status}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Ref.ID">{reference_id}</Descriptions.Item>
        {type === "Withdraw" && (
          <>
            <Descriptions.Item label="Fee">
              {payout_info.currency + " " + toDecimalMark(Number(fee))}
            </Descriptions.Item>
            <Descriptions.Item>{}</Descriptions.Item>
          </>
        )}
        <Descriptions.Item label="More Info">
          <span className="desc-inline-label">{moreInfoDetails} </span>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default IndividualTransactionsContainer;
