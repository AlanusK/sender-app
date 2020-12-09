import Icon from "@ant-design/icons";
import React from "react";
import CustomIconProp from "./CustomIconPopsTypes";

const SendMoneyIcon = (props: CustomIconProp) => {
  const iconSize = props.size ? props.size: "1em";
  const SendMoneySvg = () => (
    <svg
      version="1.1"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 30 30"
      fill={props.color ? props.color : ""}
    >
      <g>
        <path d="M15.5,10.6v1.3c0.6-0.1,1-0.4,1-0.7C16.5,11,16.3,10.8,15.5,10.6z"></path>
        <path d="M13.5,8.7c0,0.2,0.2,0.5,1,0.6V8C13.9,8.2,13.5,8.5,13.5,8.7z"></path>
        <path d="M21.5,16c0.1,0,0.1,0,0.2,0l3.8-2.3V4.5C25.5,4.2,25.3,4,25,4h-4.5H9H5C4.7,4,4.5,4.2,4.5,4.5v8.3L9.2,16H21.5z M15.5,13   v0.5c0,0.3-0.2,0.5-0.5,0.5s-0.5-0.2-0.5-0.5V13c-1.1-0.1-1.9-0.8-2-1.6c0-0.3,0.2-0.5,0.4-0.5c0.3,0,0.5,0.2,0.5,0.4   c0,0.3,0.4,0.6,1,0.7v-1.5c-0.8-0.2-2-0.5-2-1.7c0-0.9,0.8-1.6,2-1.7V6.5C14.5,6.2,14.7,6,15,6s0.5,0.2,0.5,0.5V7   c1.1,0.1,1.9,0.8,2,1.6c0,0.3-0.2,0.5-0.4,0.5c-0.3,0-0.5-0.2-0.5-0.4c0-0.3-0.4-0.6-1-0.7v1.5c0.8,0.2,2,0.5,2,1.7   C17.5,12.1,16.7,12.8,15.5,13z M22,7c0.3,0,0.5,0.2,0.5,0.5S22.3,8,22,8h-2c-0.3,0-0.5-0.2-0.5-0.5S19.7,7,20,7H22z M7.5,12.5   C7.5,12.2,7.7,12,8,12h2c0.3,0,0.5,0.2,0.5,0.5S10.3,13,10,13H8C7.7,13,7.5,12.8,7.5,12.5z"></path>
        <path d="M27.8,9.6l-1.3-1v5.3c0,0.2,0,0.4-0.2,0.5l-0.8,0.5l0,0L22,17l0,0l-3.3,2c-1,0.7-2.3,1-3.5,1c-1.2,0-2.5-0.4-3.5-1.1   L8.9,17l0,0l0,0c-0.1,0-0.2-0.1-0.2-0.1l-4.9-3.4c-0.1-0.1-0.2-0.2-0.2-0.4c0,0,0,0,0,0V8.1L1.7,9.6C1,10.2,0.5,11.1,0.5,12V26   c0,1.6,1.4,3,3,3H27c1.5,0,2.5-1.2,2.5-3V12C29.5,11,28.6,10.2,27.8,9.6z"></path>
        <path d="M18.2,18.1l1.9-1.1h-9.4l1.6,1.1C14,19.3,16.5,19.3,18.2,18.1z"></path>
        <path d="M18.3,2.2c-2.2-1.6-4.9-1.6-7.1,0l-1,0.8h9.2L18.3,2.2z"></path>
      </g>
    </svg>
  );
  return <Icon component={SendMoneySvg} {...props} />;
};

export default SendMoneyIcon;