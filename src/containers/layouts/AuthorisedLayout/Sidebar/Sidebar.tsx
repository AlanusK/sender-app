import React, { useEffect } from "react";
import { Menu, Layout } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";
import { useAuthorisedContext } from "../../../../context/authorised-layout-context";

const { Sider } = Layout;

interface ISidebar {
  isSmallScreen?: boolean;
}

const Sidebar = (props: ISidebar) => {
  const {
    siderCollapsed,
    selectedMenuItem,
    setMenuItem,
    toggleSider,
  } = useAuthorisedContext();

  useEffect(() => {
    if (props.isSmallScreen && !siderCollapsed) {
      toggleSider();
    }
  }, [props.isSmallScreen, siderCollapsed, toggleSider]);
  return (
    <div>
      <Sider trigger={null} collapsible collapsed={siderCollapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedMenuItem]}
          onClick={setMenuItem}
        >
          <Menu.Item key="dashboard" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="Transactions" icon={<VideoCameraOutlined />}>
            Transactions
          </Menu.Item>
          <Menu.Item key="deposit" icon={<VideoCameraOutlined />}>
            Deposit
          </Menu.Item>
          <Menu.Item key="withdrawal" icon={<UploadOutlined />}>
            Withdrawal
          </Menu.Item>
          <Menu.Item key="settings" icon={<UploadOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="all-components" icon={<GlobalOutlined />}>
            Components
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
