import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CustomSpin = (props: any) => {
  return <Spin indicator={antIcon} />;
};

export default CustomSpin;
