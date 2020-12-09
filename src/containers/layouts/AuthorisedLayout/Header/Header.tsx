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
import { useDarkMode } from "../../../../hooks/useDarkMode";
import { DarkModeToggle } from "../../../../components";
const { Header } = Layout;

const CustomHeader = () => {
  const { siderCollapsed, toggleSider } = useAuthorisedContext();
  const { signout } = useAuth();
  const [darkMode, setDarkMode] = useDarkMode();
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
      {React.createElement(DarkModeToggle, {
        darkMode: darkMode,
        setDarkMode: setDarkMode,
      })}
    </Header>
  );
};



export default CustomHeader;
