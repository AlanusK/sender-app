import Icon from "@ant-design/icons";
import React from "react";
import CustomIconProp from "./CustomIconPopsTypes";

const DepositIcon = (props: CustomIconProp) => {
  const iconSize = props.size ? props.size : 30;
  const ImportSvg = () => (
    <svg
      version="1.1"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 30 30"
      fill={props.color ? props.color : ""}
    >
      <path d="M8.125 5c5.859 0 10.625 4.766 10.625 10.625v4.742l-2.684-2.684c-0.244-0.244-0.64-0.244-0.884 0s-0.244 0.64 0 0.884l3.75 3.75c0.021 0.020 0.047 0.029 0.070 0.046 0.043 0.032 0.084 0.067 0.134 0.088 0.076 0.032 0.157 0.049 0.239 0.049s0.163-0.016 0.239-0.049c0.077-0.032 0.148-0.080 0.206-0.139l3.745-3.745c0.244-0.244 0.244-0.64 0-0.884s-0.64-0.244-0.884 0l-2.681 2.681v-4.74c0-6.547-5.327-11.875-11.875-11.875-0.345 0-0.625 0.28-0.625 0.625s0.28 0.625 0.625 0.625zM29.375 25h-28.75c-0.345 0-0.625 0.28-0.625 0.625s0.28 0.625 0.625 0.625h28.75c0.345 0 0.625-0.28 0.625-0.625s-0.28-0.625-0.625-0.625z"></path>
    </svg>
  );
  return <Icon component={ImportSvg} {...props} />;
};

export default DepositIcon;
