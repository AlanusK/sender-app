import React, { useEffect, useState } from "react";
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
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { DarkModeToggle, BreadCrumb } from "../../../../components";
import { Link } from "react-router-dom";

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
    <>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {mobileView ? <div className="back-to-dashboard"><Link to="/dashboard"><LeftOutlined className="leftOutlined" />Dashboard</Link></div> :
          React.createElement(
            siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggleSider,
            }
          )
        }
        {React.createElement(LogoutOutlined, {
          className: "logout-button",
          onClick: signout,
        })}
        {React.createElement(DarkModeToggle, {
          darkMode: darkMode,
          setDarkMode: setDarkMode,
        })}
      </Header>
      {/* <div className="breadCrumb">
        <BreadCrumb />
      </div> */}
    </>
  );
};


export default CustomHeader;
