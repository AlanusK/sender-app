import Icon from "@ant-design/icons";
import React from "react";
import CustomIconProp from "./CustomIconPopsTypes";

const DepositIcon = (props: CustomIconProp) => {
  const iconSize = props.size ? props.size: "1em";
  const ImportSvg = () => (
    <svg
      version="1.1"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 30 30"
      fill={props.color ? props.color : ""}
    >
      <path d="M29.375 3.75c-7.926 0-14.375 6.449-14.375 14.375v0.991l-2.683-2.683c-0.244-0.244-0.64-0.244-0.884 0s-0.244 0.64 0 0.884l3.749 3.749c0.058 0.058 0.127 0.104 0.204 0.136 0.076 0.031 0.157 0.047 0.239 0.047s0.163-0.016 0.239-0.047c0.077-0.031 0.146-0.077 0.204-0.136l3.749-3.749c0.244-0.244 0.244-0.64 0-0.884s-0.64-0.244-0.884 0l-2.683 2.683v-0.991c0-7.238 5.886-13.125 13.125-13.125 0.345 0 0.625-0.28 0.625-0.625s-0.28-0.625-0.625-0.625zM26.736 6.553c-3.96 0.905-7.247 3.859-8.578 7.709-0.075 0.217-0.025 0.459 0.131 0.628 0.155 0.167 0.391 0.238 0.615 0.181 0.64-0.165 1.333 0.016 1.796 0.48 0.354 0.354 0.549 0.825 0.549 1.326s-0.195 0.971-0.549 1.326l-3.749 3.749c-0.088 0.088-0.184 0.166-0.287 0.235l-0.149 0.077c-0.002 0.001-0.175 0.095-0.178 0.096l0.241 0.576-0.427-0.521c-0.006 0.001-0.155 0.047-0.161 0.050-0.241 0.049-0.493 0.049-0.734 0l-0.159-0.050c-0.004-0.001-0.188-0.055-0.191-0.056l-0.239 0.578 0.065-0.671c-0.006-0.004-0.141-0.075-0.149-0.079-0.104-0.069-0.2-0.148-0.287-0.235l-3.749-3.749c-0.354-0.354-0.549-0.825-0.549-1.326s0.195-0.971 0.55-1.326c0.652-0.656 1.779-0.706 2.499-0.121 0.171 0.137 0.399 0.178 0.606 0.103 0.206-0.074 0.359-0.251 0.401-0.466 0.829-4.155 3.38-7.851 7.001-10.142 0.215-0.136 0.326-0.39 0.28-0.641s-0.24-0.449-0.491-0.5c-0.041-0.007-0.179-0.031-0.22-0.031h-17.5c-1.723 0-3.125 1.402-3.125 3.125v16.25c0 1.723 1.402 3.125 3.125 3.125h21.25c1.723 0 3.125-1.402 3.125-3.125v-15.964c0-0.19-0.086-0.37-0.235-0.489-0.151-0.119-0.347-0.165-0.53-0.12z"></path>
    </svg>
  );
  return <Icon component={ImportSvg} {...props} />;
};

export default DepositIcon;