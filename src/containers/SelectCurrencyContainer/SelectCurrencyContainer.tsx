import { Avatar, Select } from "antd";
import React from "react";
import { AuthorisedCurrencies } from "../../constants";

interface ISelectCurrency {
  onCurrencyChange?(value:string, option: any): void;
}

export default function SelectCurrencyContainer(props: ISelectCurrency) {
  const formatedCurrencies = Object.entries(AuthorisedCurrencies); // converts currencies object list to an array
  const { Option } = Select;
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select Currency"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      onChange={props.onCurrencyChange}
    >
      {formatedCurrencies.map((currency) => {
        return (
          <Option value={currency[0]} key={currency[1].symbol}>
            <span>{currency[0]}</span>
            <Avatar
              size={20}
              shape="circle"
              src={currency[1].icon}
              style={{ float: "right", marginTop: "4px" }}
            />
          </Option>
        );
      })}
    </Select>
  );
}
