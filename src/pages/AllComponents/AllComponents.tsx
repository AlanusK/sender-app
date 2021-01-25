import React from "react";
import "./AllComponents.css";
import {
  DepositFormContainer,
  ExtendedWalletBallanceContainer,
  SelectCurrencyContainer,
  WalletBallanceContainer,
  KycContainer,
  TransactionsTableContainer,
  WithdrawalFormContainer,
  SendMoneyContainer,
  IndividualTransactionsContainer,
  SecuritySettingsContainer,
  UserLiteKycContainer,
  AllTransactionsTableContainer,
} from "../../containers";
import { ColumnsType } from "antd/lib/table";
import { useAuthorisedContext } from "../../context/authorised-layout-context";

const data = [
  {
    key: "1",
    date: "04/11/1990",
    amount: "USD 10,000/=",
    type: "Deposit",
    status: "Completed",
  },
  {
    key: "2",
    date: "28/05/2020",
    amount: "USD 1,000/=",
    type: "Deposit",
    status: "Completed",
  },
  {
    key: "3",
    date: "17/11/2014",
    amount: "EUR 1,000/=",
    type: "Deposit",
    status: "Completed",
  },
  {
    key: "4",
    date: "13/09/2007",
    amount: "EUR 1,000/=",
    type: "Deposit",
    status: "Cancelled",
  },
];

type transactions = {
  key: string;
  date: string;
  amount: string;
  type: string;
  status: string;
};

const columns: ColumnsType<transactions> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    // align: 'center',
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "right",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    align: "left",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    // align: 'center',
  },
];

const AllComponents = () => {
  const { userWallets } = useAuthorisedContext();
  return (
    <div className="all-components-wrapper">
      <div className="data-display-section">
        <div className="data-display-heading-wrapper">
          <h1 className="data-display-heading">Data Display components</h1>
        </div>
        <div style={{ marginTop: "40px" }}>
          <h1>Individual Transactions Container</h1>
          <IndividualTransactionsContainer />
        </div>
        <div style={{ marginTop: "40px" }}>
          <h1>Transaction Table</h1>
          <TransactionsTableContainer columns={columns} transactions={data} />
        </div>
        <div style={{ marginTop: "40px" }}>
          <h1>All Transactions Table</h1>
          <AllTransactionsTableContainer
            columns={columns}
            transactions={data}
          />
        </div>
        <div style={{ marginTop: "40px" }}>
          <h1>Wallet Balance Cards</h1>
          <WalletBallanceContainer addCurrency={() => {}} />
        </div>
        <div style={{ marginTop: "40px" }}>
          <h1> Extended Wallet Balance Cards </h1>
          <ExtendedWalletBallanceContainer
            sendMoney={() => {}}
            depositMoney={() => {}}
            withdrawalMoney={() => {}}
            userBalances={[
              { currency: "TZS", amount: 3000 },
              { currency: "USD", amount: 6000 },
            ]}
            addCurrency={() => {}}
          />
        </div>
      </div>
      <div className="data-entry-section">
        <div className="data-display-heading-wrapper">
          <h1 className="data-entry-heading">Data Entry components</h1>
        </div>
        <div style={{ marginTop: "40px" }}></div>
        <SecuritySettingsContainer />
        <div style={{ marginTop: "40px" }}>
          <h1>Extensive KYC Form</h1>
          <KycContainer />
        </div>
        <div style={{ marginTop: "40px" }}>
          <UserLiteKycContainer />
        </div>
        <div style={{ marginTop: "40px" }}>
          <h1>Select Currency Components</h1>
          <SelectCurrencyContainer currencyOptions={[{ currency: "TZS" }]} />
        </div>
        <div style={{ marginTop: "80px" }}>
          <h1>Deposit Form Container</h1>
          <DepositFormContainer />
        </div>
        <div style={{ marginTop: "20px" }}>
          <h1>Withdrawal Form Container</h1>
          <WithdrawalFormContainer />
        </div>
        <div style={{ marginTop: "80px" }}>
          <h1>Send Money Form Container</h1>
          <SendMoneyContainer
            userBalances={userWallets}
            setSendMoneyFuncRef={()=>{}}
          />
          ;
        </div>
      </div>
    </div>
  );
};

export default AllComponents;
