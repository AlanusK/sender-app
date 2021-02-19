import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const SiteFooter = () => {
  return (
      <Footer style={{ textAlign: "center", margin:"0 14px" }}>
        ©{new Date().getFullYear()} | ClickPesa
      </Footer>
  );
};

export default SiteFooter;
