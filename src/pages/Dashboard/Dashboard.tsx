import { Avatar, Button, Card, Col, Row, Statistic, Tooltip } from "antd";
import React from "react";
import {
  SettingOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={[12, 12]}>
        <Col xs={24} md={8} lg={6}>
          <Card
            title="TZS"
            bordered={true}
            hoverable={true}
            extra={
              <Avatar
                shape="circle"
                size={36}
                src="https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg"
              />
            }
          >
            <Statistic
              title="TZS"
              value={"10,000,000.28"}
              precision={4}
              valueStyle={{ color: "#3f8600" }}
              prefix={""}
              suffix=""
              style={{ textAlign: "right" }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8} lg={6}>
          <Card
            title="USD"
            bordered={true}
            hoverable={true}
            extra={
              <Avatar
                shape="circle"
                size={36}
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
              />
            }
          >
            <Statistic
              title="$"
              value={"10,000.00"}
              precision={4}
              valueStyle={{ color: "#3f8600" }}
              prefix={""}
              suffix=""
              style={{ textAlign: "right" }}
            />
          </Card>
        </Col>
        <Col span={24} md={8} lg={6}>
          <Card
            title="USD"
            bordered={true}
            hoverable={true}
            extra={
              <Avatar
                shape="circle"
                size={36}
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
              />
            }
            actions={[
              <Button icon={<SearchOutlined />}>Deposit</Button>,
              <Button icon={<SearchOutlined />}>Send</Button>,
              <Button icon={<SearchOutlined />}>Withdrawal</Button>,
            ]}
          >
            <Statistic
              title="$"
              value={"10,000.00"}
              precision={4}
              valueStyle={{ color: "#3f8600" }}
              prefix={""}
              suffix=""
              style={{ textAlign: "right" }}
            />
          </Card>
        </Col>
        <Col span={24} md={8} lg={6}>
          <Card title="Card title" bordered={true}>
            Card content
          </Card>
        </Col>
        <Col span={24} md={8} lg={6}>
          <Card title="Card title" bordered={true}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
