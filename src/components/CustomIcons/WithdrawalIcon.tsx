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
      <path d="M27.37 12.632c-0.058-0.174-0.189-0.313-0.359-0.382-0.169-0.067-0.36-0.059-0.523 0.026-0.771 0.403-1.633 0.23-2.188-0.326-0.469-0.469-0.649-1.141-0.48-1.796 0.058-0.223-0.011-0.459-0.181-0.615-0.17-0.157-0.411-0.209-0.628-0.131-4.791 1.655-8.011 6.164-8.011 11.218 0 1.034-0.841 1.875-1.875 1.875s-1.875-0.841-1.875-1.875c0-6.325 3.79-11.986 9.655-14.422 0.275-0.115 0.431-0.407 0.373-0.7-0.058-0.293-0.315-0.503-0.613-0.503h-17.541c-1.723 0-3.125 1.403-3.125 3.125v16.25c0 1.723 1.402 3.125 3.125 3.125h21.25c1.723 0 3.125-1.402 3.125-3.125v-11.25c0-0.067-0.011-0.134-0.032-0.197l-0.097-0.295zM29.953 6.636c-0.031-0.077-0.077-0.146-0.136-0.204l-3.749-3.749c-0.244-0.244-0.64-0.244-0.884 0s-0.244 0.64 0 0.884l2.683 2.683h-0.991c-7.926 0-14.375 6.449-14.375 14.375 0 0.345 0.28 0.625 0.625 0.625s0.625-0.28 0.625-0.625c0-7.237 5.888-13.125 13.125-13.125h0.991l-2.683 2.683c-0.244 0.244-0.244 0.64 0 0.884 0.122 0.122 0.283 0.182 0.442 0.182s0.32-0.061 0.443-0.182l3.749-3.749c0.056-0.058 0.103-0.127 0.135-0.204 0.064-0.152 0.064-0.325 0-0.478z"></path>
    </svg>
  );
  return <Icon component={ExportSvg} {...props} />;
};

export default WithdrawalIcon;
