import React from 'react';
import "./IndividualTransactionsContainer.css";

const IndividualTransactionsContainer = () => {

    return (
        <div className="content-individual-transactions">
            <div className="single-data">
                <h3 className="title-single-data">Date</h3>
                <p>09/11/2020 10:11</p>
            </div>
            <div className="single-data">
                <h3 className="title-single-data">Amount</h3>
                <p>USD 10,000</p>
            </div>
            <div className="single-data">
                <h3 className="title-single-data">Fee</h3>
                <p>USD 1</p>
            </div>
            <div className="single-data">
                <h3 className="title-single-data">Status</h3>
                <p>Completed</p>
            </div>
            <div className="single-data">
                <h3 className="title-single-data">Sender</h3>
                <p>Name</p>
            </div>
        </div>
    );
};

export default IndividualTransactionsContainer;  