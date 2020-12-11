import { Row, Space, Upload } from "antd";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import "./GeneralSettingsContainer.css";

export default function GeneralSettingsContainer() {
  const [imageUrl, setImageUrl] = useState(
    "https://instagram.fmba3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/122720943_146791640466339_771259221611743391_n.jpg?_nc_ht=instagram.fmba3-1.fna.fbcdn.net&_nc_ohc=3eKjc-xIGWMAX-1uPQb&tp=1&oh=b9bd34e0f33d03d0bf8067fe872be408&oe=5FFC28C6"
  );
  const [loading, setLoading] = useState();

  return (
    <Row>
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
    </Row>
  );
}
