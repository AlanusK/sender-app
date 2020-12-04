import Icon from "@ant-design/icons";
import React from "react";
import CustomIconProp from "./CustomIconPopsTypes";

const WithdrawalIcon = (props: CustomIconProp) => {
  const iconSize = props.size ? props.size : 30;
  const ExportSvg = () => (
    <svg
      version="1.1"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 30 30"
      fill={props.color ? props.color : ""}
    >
      <path d="M29.375 23.749h-28.75c-0.345 0-0.625 0.28-0.625 0.625s0.28 0.625 0.625 0.625h28.75c0.345 0 0.625-0.28 0.625-0.625s-0.28-0.625-0.625-0.625zM8.125 21.249c0.345 0 0.625-0.28 0.625-0.625 0-5.859 4.766-10.625 10.625-10.625h4.741l-2.684 2.684c-0.244 0.244-0.244 0.64 0 0.884 0.122 0.121 0.283 0.182 0.443 0.182s0.32-0.061 0.441-0.181l3.75-3.75c0.017-0.017 0.024-0.040 0.039-0.058 0.036-0.045 0.074-0.091 0.096-0.146 0.023-0.054 0.028-0.111 0.034-0.167 0.004-0.025 0.015-0.046 0.015-0.073 0-0.059-0.019-0.111-0.034-0.165-0.006-0.022-0.005-0.047-0.014-0.070-0.032-0.081-0.081-0.152-0.144-0.212l-3.742-3.743c-0.244-0.244-0.64-0.244-0.884 0s-0.244 0.64 0 0.884l2.681 2.681h-4.739c-6.547 0-11.875 5.327-11.875 11.875 0 0.345 0.28 0.625 0.625 0.625z"></path>
    </svg>
  );
  return <Icon component={ExportSvg} {...props} />;
};

export default WithdrawalIcon;
