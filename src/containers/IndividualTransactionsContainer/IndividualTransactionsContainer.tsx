import React from "react";
import "./IndividualTransactionsContainer.css";

interface IIndividualTransactionsProps {
  data: any;
}

const IndividualTransactionsContainer = ({
  data: { date, amount, status },
}: IIndividualTransactionsProps) => {
  return (
    <div className="content-individual-transactions">
      <div className="single-data">
        <h3 className="title-single-data">Date</h3>
        <p>{date}</p>
      </div>
      <div className="single-data">
        <h3 className="title-single-data">Amount</h3>
        <p>{amount}</p>
      </div>
      <div className="single-data">
        <h3 className="title-single-data">Fee</h3>
        <p>USD 1</p>
      </div>
      <div className="single-data">
        <h3 className="title-single-data">Status</h3>
        <p>{status}</p>
      </div>
      <div className="single-data">
        <h3 className="title-single-data">Sender</h3>
        <p>Name</p>
      </div>
    </div>
  );
};

export default IndividualTransactionsContainer;
