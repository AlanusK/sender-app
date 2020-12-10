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
