import React from 'react';
import "./IndividualTransactionsContainer.css";

interface IIndividualTransactionsProps {
    key: string;
    date: string;
    amount: string;
    type: String;
    status: String;
}

const IndividualTransactionsContainer = (props: IIndividualTransactionsProps) => {

    return (
        <div className="content-individual-transactions">
            <div className="single-data">
                <h3 className="title-single-data">Date</h3>
                <p>{props.date}</p>
            </div>
            <div className="single-data">
                <h3 className="title-single-data">Amount</h3>
                <p>{props.amount}</p>
            </div>
            <div className="single-data">
                <h3 className="title-single-data">Fee</h3>
                <p>USD 1</p>
            </div>
            <div className="single-data">
                <h3 className="title-single-data">Status</h3>
                <p>{props.status}</p>
            </div>
            <div className="single-data">
                <h3 className="title-single-data">Sender</h3>
                <p>Name</p>
            </div>
        </div>
    );
};

export default IndividualTransactionsContainer;  