import React from "react";
import "./KycContainer.css";
import { Form, Input, Row, Col, DatePicker, Select, Upload, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const KycContainer = () => {

  const [form] = Form.useForm();

  return (
    <>
      <div>
        <h2 className="title">Get Started</h2>
        <hr className="line" />
      </div>
      <Form
        form={form}
        name='register'
        className=''
        // onFinish={onFinish}
        scrollToFirstError
        layout={'vertical'}
      >
        <div className="form-section">
          <h3>General</h3>
          <Row>
            <Col span={10} >
              <Form.Item
                label="First name(s)"
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input placeholder="Bob" />
              </Form.Item>
            </Col>
            <Col span={10} offset={4}>
              <Form.Item
                label="Last name(s)"
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input placeholder="Ross" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={10} >
              <Form.Item
                label="Date of birth"
                name="birthdate"
                rules={[{ required: true, message: 'Please input your birthdate!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={10} offset={4}>
              <Form.Item
                label="Phone number"
                name="phoneNumber"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={10}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your e-mail!' }]}
              >
                <Input placeholder="b.ross@gmail.com" />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <hr className="line" />

        <div className="form-section">
          <h3>Address information</h3>
          <Row>
            <Col span={10} >
              <Form.Item
                label="Street name"
                name="streetName"
                rules={[{ required: true, message: 'Please input your street name!' }]}
              >
                <Input placeholder="Loon Street 44" />
              </Form.Item>
            </Col>
            <Col span={10} offset={4}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please input your city!' }]}
              >
                <Input placeholder="Arusha" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={10} >
              <Form.Item
                label="District"
                name="district"
                rules={[{ required: true, message: 'Please input your district!' }]}
              >
                <Select>
                  <Select.Option value='arusha'>Arusha</Select.Option>
                  <Select.Option value='dodoma'>Dodoma</Select.Option>
                  <Select.Option value='dar'>Dar-es-salaam</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10} offset={4}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: 'Please input your country!' }]}
              >
                <Select>
                  <Select.Option value='tanzania'>Tanzania</Select.Option>
                  <Select.Option value='kenya'>Kenya</Select.Option>
                  <Select.Option value='rwanda'>Rwanda</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <hr className="line" />

        <div className="form-section">
          <h3>Documents</h3>
          <Row>
            <Col span={10} >
              <Form.Item
                label="Identification type"
                name="idType"
                rules={[{ required: true, message: 'Please input your identification type!' }]}
              >
                <Select>
                  <Select.Option value='passport'>Passport</Select.Option>
                  <Select.Option value='drivingLicence'>Driving Licence</Select.Option>
                  <Select.Option value='nationalId'>National ID</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10} offset={4}>
              <Form.Item
                label="Identification number"
                name="idNumber"
                rules={[{ required: true, message: 'Please input identification number!' }]}
              >
                <Input placeholder="-" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Identification document"
                name="idDocument"
                rules={[{ required: true, message: 'Please input your identication document!' }]}
              >
                <Upload >
                  <Button className="upload-button" icon={<UploadOutlined />} block>Upload identification document</Button>
                </Upload>
              </Form.Item>

            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item>
                <Button className="form-button" type="primary">Proceed</Button>
              </Form.Item>
            </Col>
          </Row>
        </div>

      </Form>
    </>
  );
};

export default KycContainer;