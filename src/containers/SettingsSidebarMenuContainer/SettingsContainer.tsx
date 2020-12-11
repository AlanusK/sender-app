import { Tabs } from "antd";
import React from "react";
import GeneralSettingsContainer from "../GeneralSettingsContainer/GeneralSettingsContainer";
import './SettingsContainer.css'
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
        tabBarExtraContent="⛳"
        tabPosition="left"
      >
        <TabPane tab="General" key="1">
          <GeneralSettingsContainer/>
        </TabPane>
        <TabPane tab="Security" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Payments" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Notifications" key="4">
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
    </div>
  );
}