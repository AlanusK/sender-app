import React, { useEffect } from "react";
import { Menu, Layout } from "antd";
import {
  FundOutlined,
  WalletOutlined,
  SettingOutlined,
  GlobalOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";
import { useAuthorisedContext } from "../../../../context/authorised-user-context";

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
    <div className="sider-layout" >
      <Sider trigger={null} collapsible collapsed={siderCollapsed}>
        <div className="logo">
          <FundOutlined /> Sender Dashboard
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedMenuItem]}
          onClick={setMenuItem}
          style={{marginTop: "30px"}}
        >
          <Menu.Item key="dashboard" icon={<FundOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="wallet" icon={<WalletOutlined />}>
            Wallet
          </Menu.Item>
          <Menu.Item key="transactions" icon={<UnorderedListOutlined />}>
            Transactions
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
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
