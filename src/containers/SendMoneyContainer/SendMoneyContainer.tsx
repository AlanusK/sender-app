import React, { useState } from 'react';
import { Form, Input, Button, Radio, Select, Row, Col } from 'antd';
import "./SendMoneyContainer.css";

const SendMoneyContainer = () => {
  const [form] = Form.useForm();


  return (
    <>
      <h3 className="title">Send</h3>
      <hr className="line-top"></hr>
      <Form
        form={form}
        layout={'vertical'}
      >
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item
              label={<label style={{ color: "gray" }}>Wallet</label>}
            >
              <Select>
                <Select.Option value='USD'>USD</Select.Option>
                <Select.Option value='TZS'>TZS</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item
              label={<label style={{ color: "gray" }}>Amount</label>}
            >
              <Input placeholder="100" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" className="balance">
          Balance: 10,000 USD
        </Row>
        <Form.Item
          label={<label style={{ color: "gray" }}>Payout method</label>}
        >
          <Select>
            <Select.Option value='M-pesa Kenya'>M-pesa Kenya</Select.Option>
            <Select.Option value='M-pesa Tanzania'>M-pesa Tanzania</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "gray" }}>Mobile money number</label>}
        >
          <Input placeholder="0763212347" />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "gray" }}>Name receiver</label>}
        >
          <Input placeholder="John Doe" />
        </Form.Item>
        <Form.Item>
          <Row gutter={16} justify="end">
            <Col span={16}><h4>Amount</h4></Col>
            <Col span={8}><h4 className="amount-output">$100</h4></Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}><h4>Amount KES (1 USD = KES 2310) </h4></Col>
            <Col span={8}><h4 className="amount-output">KES 231,000</h4></Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}><h4>Net Payout amount</h4></Col>
            <Col span={8}><h4 className="amount-output">KES 231,000</h4></Col>
          </Row>
        </Form.Item>
        <hr className="line-bottom"></hr>
        <Form.Item className="form-item-button">
          <Button className="button" type="primary">Send</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SendMoneyContainer;