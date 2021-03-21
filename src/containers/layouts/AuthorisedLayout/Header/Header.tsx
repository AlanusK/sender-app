import React, { useEffect, useState } from "react";
import { Layout, Drawer, Button, Dropdown, Menu } from "antd";
import { useAuthorisedContext } from "../../../../context/authorised-user-context";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  LeftOutlined,
  BellOutlined,
  MenuOutlined,
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
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [showBreadcrumb, setShowBreadcrumb] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [showIndividualNotification, setShowIndividualNotification] = useState<boolean>(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
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

  const openIndividualNotification = () => {
    setShowIndividualNotification(true);
  }

  const closeIndividualNotification = () => {
    setShowIndividualNotification(false);
  };

  const openDropdownMenu = () => {
    setShowDropdownMenu(true);
  }

  const closeDropdownMenu = () => {
    setShowDropdownMenu(false);
  }


  const {
    setMenuItem,
  } = useAuthorisedContext();

  var mobileMenuWidth = "100px";
  var mobileMenuHeight = "";
  var mobileTopMargin = ""

  if(mobileView === true) {
    mobileMenuWidth = "100vw";
    mobileMenuHeight = "100vh";
    mobileTopMargin = "-58px";
  }

  const menu = (
    <Menu
      className="dropdown-menu-items"
      style={{ width: mobileMenuWidth, height: mobileMenuHeight, marginTop: mobileTopMargin }}
    >
      {mobileView ?
        <>
          <Button 
              onClick={closeDropdownMenu}
              className="dropdown-menu-mobile-button"
            >
              X
          </Button>
          <Menu.Item key="dashboard" onClick={(key) => { setMenuItem(key); closeDropdownMenu() }}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="wallet" onClick={(key) => { setMenuItem(key); closeDropdownMenu() }}>
            Wallet
          </Menu.Item>
          <Menu.Item key="transactions" onClick={(key) => { setMenuItem(key); closeDropdownMenu() }}>
            Transactions
          </Menu.Item>
          <Menu.Item key="settings" onClick={(key) => { setMenuItem(key); closeDropdownMenu() }}>
            Settings
          </Menu.Item>
          <Menu.Item key="logout" onClick={signout}>
            Log out
          </Menu.Item>
        </>
        :
        <>
          <Menu.Item key="settings" onClick={setMenuItem}>
            Settings
          </Menu.Item>
          <Menu.Item key="logout" onClick={signout}>
            Log out
          </Menu.Item>
        </>
      }
    </Menu>
  );
  return (
    <>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {mobileView ?
          <Dropdown
            overlay={menu} trigger={['click']}
            className="dropdown-menu"
            visible={mobileView ? showDropdownMenu : false}
          >
            <MenuOutlined onClick={openDropdownMenu} />
          </Dropdown>
          : 
          <Dropdown
            overlay={menu} trigger={['click']}
            className="dropdown-menu"
          >
            <MenuOutlined />
          </Dropdown>
        }
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
        title={!showIndividualNotification ?
          <div className="drawer-title">
            <div className="title-notification-heading">Notifications</div>
            <div className="title-notification-number">1</div>
          </div> :
          <div className="drawer-title">
            <div className="title-notification-heading">Notification</div>
            <div className="title-notification-button-wrapper">
              <Button
                className="title-notification-button"
                onClick={closeIndividualNotification}
              >
                <LeftOutlined className="title-notification-leftOutlined" />
              </Button>
            </div>
          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={350}
      >
        {!showIndividualNotification ?
          <>
            <div className="notification-message" onClick={openIndividualNotification}>
              <p className="notification-type">
                <strong className="notification-type-selected">
                  Payment request - outstanding
            </strong>
              </p>
              <p className="notification-day">Today</p>
            </div>
            <div className="notification-message" onClick={openIndividualNotification}>
              <p className="notification-type">Payment request - outstanding</p>
              <p className="notification-day">Yesterday</p>
            </div>
            <div className="notification-message" onClick={openIndividualNotification}>
              <p className="notification-type">Payment request - Paid</p>
              <p className="notification-day">Sept 12</p>
            </div>
          </>
          :
          <>
            <div className="individual-notification">
              <p className="individual-notification-type">Amount</p>
              <p className="individual-notification-description">100.00 USD</p>
            </div>
            <div className="individual-notification">
              <p className="individual-notification-type">Sender</p>
              <p className="individual-notification-description">Victor Lastname</p>
            </div>
            <div className="individual-notification">
              <p className="individual-notification-type">Wallet address</p>
              <p className="individual-notification-description">victor*clickpesa.com</p>
            </div>
            <div className="individual-notification">
              <p className="individual-notification-type">Status</p>
              <p className="individual-notification-description">Outstanding</p>
            </div>
            <div className="individual-notification">
              <p className="individual-notification-type">Description</p>
              <p className="individual-notification-description">Social media help with posting several things</p>
            </div>
            <div><Button className="content-notification-button">Proceed</Button></div>
          </>
        }
      </Drawer>
    </>
  );
};


export default CustomHeader;
