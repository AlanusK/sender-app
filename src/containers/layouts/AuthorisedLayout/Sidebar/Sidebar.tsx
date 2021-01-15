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
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const { Sider } = Layout;
const Sidebar = () => {
  const {
    siderCollapsed,
    selectedMenuItem,
    setMenuItem,
    toggleSider,
  } = useAuthorisedContext();
  const screens = useBreakpoint();

  useEffect(() => {
    if (screens.xs && !siderCollapsed) {
      toggleSider();
    }
  }, [screens.xs, siderCollapsed, toggleSider]);
  return (
    <div>
      <Sider trigger={null} collapsible collapsed={siderCollapsed}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[selectedMenuItem]}
          onClick={setMenuItem}
        >
          <Menu.Item key="dashboard" icon={<UserOutlined />}>
            Dashboard
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
