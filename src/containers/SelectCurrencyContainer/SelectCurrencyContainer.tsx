import { Avatar, Select } from "antd";
import React from "react";
import { supportedCurrencies } from "../../constants";
import { useAuthorisedContext } from "../../context/authorised-user-context";

interface ISelectCurrency {
  currencyOptions: { currency: string }[];
  onCurrencyChange?(value: string, option: any): void;
  width?: number | string;
}

export default function SelectCurrencyContainer({
  currencyOptions,
  onCurrencyChange,
  width,
}: ISelectCurrency) {
  const { activeWallet } = useAuthorisedContext();
  const { Option } = Select;
  return (
    <Select
      showSearch
      style={{ width: width || 200 }}
      placeholder="Select Currency"
      optionFilterProp="children"
      filterOption={(input, Option) =>
        Option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      onChange={onCurrencyChange}
      value={activeWallet.currency || "Select Currency"}
    >
      {currencyOptions.map((option) => {
        return (
          <Option
            value={option.currency}
            key={
              supportedCurrencies.filter(
                (curr) => curr.currency === option.currency
              )[0].symbol
            }
          >
            <span>{option.currency}</span>
            <Avatar
              size={20}
              shape="circle"
              src={
                supportedCurrencies.filter(
                  (curr) => curr.currency === option.currency
                )[0].icon
              }
              style={{ float: "right", marginTop: "4px" }}
            />
          </Option>
        );
      })}
    </Select>
  );
}
