import { Button, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";
// import Avatar from "antd/lib/avatar/avatar";
import "./GeneralSettingsContainer.css";
import { useAuthorisedContext } from "../../context/authorised-user-context";


export default function GeneralSettingsContainer() {
  // const [imageUrl, setImageUrl] = useState(
  //   "https://instagram.fmba3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/122720943_146791640466339_771259221611743391_n.jpg?_nc_ht=instagram.fmba3-1.fna.fbcdn.net&_nc_ohc=3eKjc-xIGWMAX-1uPQb&tp=1&oh=b9bd34e0f33d03d0bf8067fe872be408&oe=5FFC28C6"
  // );
  // const [loading, setLoading] = useState();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState<boolean>(false);
  const { userDetails } = useAuthorisedContext();

  const onRequiredTypeChange = (params: any) => {
    console.log("params :>> ", params);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleEdit = () => {
    setEditMode(true);
  }

  const handleSave = () => {
    setEditMode(false);
  }

  return (
    <>
      {/* <Row
        style={{
          borderBottom: "1px solid #f2f2f3",
          paddingBottom: "20px",
          marginBottom: "20px",
          width: "98%"
        }}
      >
        <Space>
          <Avatar
            src={imageUrl}
            shape="circle"
            className="profile-picture-avatar"
          />
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            //beforeUpload={beforeUpload}
            //onChange={this.handleChange}
            withCredentials={true}
          >
            {imageUrl ? "Update Picture" : "Upload Picture"}
          </Upload>
        </Space>
      </Row> */}
      <Row style={{ width: "98%" }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={true}
          size="middle"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: "100%" }}
        >
          <Form.Item
            label={<label style={{ color: "gray" }}>Name</label>}
          // required
          // tooltip="This is a required field"
          >
            <Input
              className="general-form-input"
              placeholder="Bill Rush"
              name="nani"
              value={userDetails.name}
              disabled={!editMode} />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "gray" }}>Email</label>}
          // tooltip={{
          //   title: "Tooltip with customize icon",
          //   icon: <InfoCircleOutlined />,
          // }}
          >
            <Input
              className="general-form-input"
              placeholder="makemoney@club.com"
              name="nini"
              value={userDetails.email}
              disabled={!editMode} />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "gray" }}>Phone</label>}
          >
            <Input
              placeholder="Your Phone Number..."
              value={userDetails.phone}
              disabled={!editMode} />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "gray" }}>Language</label>}
          >
            <Select defaultValue='English' value={userDetails.language} disabled={!editMode}>
              <Select.Option value='English'>English</Select.Option>
              <Select.Option value='Swahili'>Swahili</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Row>
      <Row className="general-form-button-wrapper">
        {!editMode && <Button type="primary" className="general-form-edit-button" onClick={handleEdit} >Edit</Button>}
        {editMode && <Button type="primary" className="general-form-save-button" onClick={handleSave} >Save Changes</Button>}
      </Row>
    </>
  );
}
