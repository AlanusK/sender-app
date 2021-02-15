import { bankDetails } from "./types";

/**
 * list of currencies supported by clickpesa
 * that are allowed to send and receive payments
 */
export const supportedCurrencies = [
  {
    currency: "TZS",
    icon:
      "https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg",
    symbol: "TSh",
    minTransfer: 999,
    maxTransfer: 10000000,
    transferFee: 2000,
  },
  {
    currency: "USD",
    icon:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png",
    symbol: "$",
    minTransfer: 9,
    maxTransfer: 10000,
    transferFee: 5,
  },
  {
    currency: "KES",
    icon:
      "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg",
    symbol: "KSh",
    minTransfer: 99,
    maxTransfer: 10000000,
    transferFee: 200,
  },
  {
    currency: "RWF",
    icon:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg",
    symbol: "R₣",
    minTransfer: 1999,
    maxTransfer: 2000000,
    transferFee: 100,
  },
  {
    currency: "GBP",
    icon:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png",
    symbol: "£",
    minTransfer: 9,
    maxTransfer: 10000,
    transferFee: 5,
  },
  {
    currency: "EUR",
    icon:
      "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg",
    symbol: "€",
    minTransfer: 9,
    maxTransfer: 10000,
    transferFee: 5,
  },
];
/**
 * clickpesa bank accounts details
 */
export const clickPesaBankAccountDetails: bankDetails[] = [
  {
    currency: "TZS",
    bankName: "ECOBANK TANZANIA",
    branchName: "H/O",
    accountName: "PAYCLICK LIMITED (TZS)",
    accountNumber: 708000203,
    bankCode: "	ECOC",
    swiftNumber: "ECOCTZTZ",
  },
  {
    currency: "KES",
    bankName: "EQUITY BANK KENYA",
    branchName: "H/O",
    accountName: "CLICKPESA COMPANY KENYA LIMITED",
    accountNumber: 1770280480747,
    bankCode: "068",
    swiftNumber: "EQBLKENA",
  },
];
