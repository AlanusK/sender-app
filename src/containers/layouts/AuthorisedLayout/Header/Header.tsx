import React, { useEffect, useState } from "react";
import { Layout, Drawer, Button } from "antd";
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
  const [visible, setVisible] = useState(false);
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

  const openNotification = () => {
    setVisible(true);
  }

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {/* {mobileView ? <div className="back-to-dashboard"><Link to="/dashboard"><LeftOutlined className="leftOutlined" />{pathnames[0]}</Link></div> :
  
            } */}

        {React.createElement(LogoutOutlined, {
          className: "logout-button",
          onClick: signout,
        })}
        {React.createElement(DarkModeToggle, {
          darkMode: darkMode,
          setDarkMode: setDarkMode,
        })}

        <Button onClick={openNotification} className="notification-button">
          <BellOutlined />
          <div className="button-notification-number">1</div>
        </Button>

      </Header>
      {showBreadcrumb ?
        <div className="breadCrumb">
          <BreadCrumb />
        </div> : null
      }

      <Drawer
        title={
          <div className="drawer-title">
            <div className="title-notification-heading">Notifications</div>
            <div className="title-notification-number">1</div>
          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={350}
      >
        <div className="notification-message">
          <p className="notification-type"><strong className="notification-type-selected">Payment request - outstanding</strong></p>
          <p className="notification-day">Today</p>
        </div>
        <div className="notification-message">
          <p className="notification-type">Payment request - outstanding</p>
          <p className="notification-day">Yesterday</p>
        </div>
        <div className="notification-message">
          <p className="notification-type">Payment request - Paid</p>
          <p className="notification-day">Sept 12</p>
        </div>
      </Drawer>

    </>
  );
};


export default CustomHeader;
