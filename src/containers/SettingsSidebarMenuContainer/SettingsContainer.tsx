import { Tabs } from "antd";
import React from "react";
import GeneralSettingsContainer from "../GeneralSettingsContainer/GeneralSettingsContainer";
import SecuritySettingsContainer from "../SecuritySettingsContainer/SecuritySettingsContainer";
import './SettingsContainer.css'
import PaymentSettingsContainer from "../PaymentSettingsContainer/PaymentSettingsContainer";
import ProfileSettingsContainer from "../ProfileSettingsContainer/ProfileSettingsContainer";

const { TabPane } = Tabs;
export default function SettingsContainer() {
  function callback(key: string) {
    console.log(key);
  }
  return (
    <div className="settings-page">
      <Tabs
        defaultActiveKey="1"
        onChange={callback}
        tabBarExtraContent=""
        tabPosition="left"
      >
        <TabPane tab="General" key="1">
          <GeneralSettingsContainer/>
        </TabPane>
        <TabPane tab="Security" key="2">
          <SecuritySettingsContainer/>
        </TabPane>
        <TabPane tab="Profile" key="3">
          <ProfileSettingsContainer/>
        </TabPane>
        <TabPane tab="Payment Settings" key="4">
        <PaymentSettingsContainer/>
        </TabPane>
        <TabPane tab="Notifications" key="5">
          Content of Tab Pane 5
        </TabPane>
      </Tabs>
    </div>
  );
}
