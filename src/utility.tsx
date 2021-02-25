import { StellarWalletBalanceProps } from "./types";
import { customAlphabet } from "nanoid";

export const toCurrency = (
  amount: number,
  currency: string,
  LanguageFormat = undefined
) =>
  Intl.NumberFormat(LanguageFormat, {
    style: "currency",
    currency: currency,
  }).format(amount);

//convert float-point arithmetic to the decimal mark
//form by using a number to make a comma-separated string
export const toDecimalMark = (amount: number) => amount.toLocaleString("en-GB");

export const debounce = (fn: any, ms = 0) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};

export const formatWalletBalances = (balances: any) =>
  balances
    .filter(
      (balance: StellarWalletBalanceProps) =>
        balance.asset_type !== "native" &&
        (balance.asset_code === "TZS" || balance.asset_code === "KES")
    )
    .map((balance: StellarWalletBalanceProps) => ({
      amount: Math.round(balance.balance * 100) / 100,
      currency: balance.asset_code,
    }));

/**
 * generates custom unique iD
 * @param {*} prefex
 */
export const generateUniqueReferenceId = (prefex = "") => {
  const nanoid = customAlphabet("1234567890LP", 6);
  return prefex !== "" ? prefex + nanoid() : nanoid();
};
