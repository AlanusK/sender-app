import React from "react";
import { Menu, Layout } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";
import { useAuthorisedContext } from "../../../../context/authorised-layout-context";

const { Sider } = Layout;

const Sidebar = () => {
  const {
    siderCollapsed,
    selectedMenuItem,
    setMenuItem,
  } = useAuthorisedContext();
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
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
