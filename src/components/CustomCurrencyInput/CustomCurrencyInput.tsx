import React from "react";
import CurrencyInput from "react-currency-input-field";

interface ICustomCurrencyInputProps {
  prefix: string;
  disabled?: boolean;
  allowNegativeValue?: boolean;
  defaultValue?: number;
  onChange?(value: string | undefined): any;
  height?:number
}

export default function CustomCurrencyInput(props: ICustomCurrencyInputProps) {
  return (
    <div className="ant-input-number-input-wrap">
      <CurrencyInput
        className={"ant-input-number"}
        style={{ width: 200, height: props?.height || 28, paddingLeft: 10 }}
        prefix={`${props?.prefix} ` || ""}
        disabled={props?.disabled || false}
        defaultValue={props?.defaultValue}
        allowNegativeValue={props?.allowNegativeValue || false}
        placeholder={"0"}
        onChange={props?.onChange}
        turnOffAbbreviations={true}
        spellCheck="false"
      />
    </div>
  );
}
