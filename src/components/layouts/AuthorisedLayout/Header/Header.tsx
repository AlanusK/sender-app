import React from "react";
import { Layout } from "antd";
import { useAuthorisedContext } from "../../../../context/authorised-layout-context";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { useAuth } from "../../../../hooks/useAuth";
const { Header } = Layout;

const CustomHeader = () => {
  const { siderCollapsed, toggleSider } = useAuthorisedContext();
  const { signout } = useAuth();
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(
        siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: toggleSider,
        }
      )}
      {React.createElement(LogoutOutlined, {
        className: "logout-button",
        onClick: signout,
      })}
    </Header>
  );
};

export default CustomHeader;
