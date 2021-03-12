import React, {useEffect, useState} from "react";
import { Layout } from "antd";
import { useAuthorisedContext } from "../../../../context/authorised-user-context";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { useAuth } from "../../../../hooks/useAuth";
import { useDarkMode } from "../../../../hooks/useDarkMode";
import { DarkModeToggle } from "../../../../components";
import useBreakpoint from "../../../../hooks/useBreakpoint";

const { Header } = Layout;

const CustomHeader = () => {
  const { siderCollapsed, toggleSider } = useAuthorisedContext();
  const { signout } = useAuth();
  const [darkMode, setDarkMode] = useDarkMode();
  const screens = useBreakpoint();
  const [mobileView, setMobileView] = useState<Boolean>(false);
  useEffect(() => {
    if (screens.xs) {
      setMobileView(true)
    } else
      setMobileView(false)
  }, [screens.xs, setMobileView])
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
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
