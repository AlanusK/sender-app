import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useAuthorisedContext } from "../../../../context/authorised-user-context";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  LeftOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { useAuth } from "../../../../hooks/useAuth";
import { useDarkMode } from "../../../../hooks/useDarkMode";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { DarkModeToggle, BreadCrumb } from "../../../../components";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;
const CustomHeader = () => {
  const { siderCollapsed, toggleSider } = useAuthorisedContext();
  const { signout } = useAuth();
  const [darkMode, setDarkMode] = useDarkMode();
  const screens = useBreakpoint();
  const [mobileView, setMobileView] = useState<Boolean>(false);
  const [showBreadcrumb, setShowBreadcrumb] = useState<Boolean>(false);
  useEffect(() => {
    if (screens.xs) {
      setMobileView(true)
    } else
      setMobileView(false)
  }, [screens.xs, setMobileView])

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((item: any) => item);
  useEffect(() => {
    if (pathnames[0] !== "dashboard") {
      setShowBreadcrumb(true)
    } else
      setShowBreadcrumb(false)
  }, [pathnames])

  return (
    <>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {/* {mobileView ? <div className="back-to-dashboard"><Link to="/dashboard"><LeftOutlined className="leftOutlined" />{pathnames[0]}</Link></div> :
  
            } */}

        {React.createElement(BellOutlined, {
          className: "notification-button",
          // onClick: openNotification,
        })}
        {React.createElement(LogoutOutlined, {
          className: "logout-button",
          onClick: signout,
        })}
        {React.createElement(DarkModeToggle, {
          darkMode: darkMode,
          setDarkMode: setDarkMode,
        })}
      </Header>
      {showBreadcrumb ? 
        <div className="breadCrumb">
          <BreadCrumb />
        </div> : null
      }
    </>
  );
};


export default CustomHeader;
