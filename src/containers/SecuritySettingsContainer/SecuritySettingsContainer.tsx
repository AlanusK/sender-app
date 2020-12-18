import React from 'react';
import { Form, Input, Button, } from 'antd';
import "./SecuritySettingsContainer.css";
// import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const SecuritySettingsContainer = () => {

    //   const screens = useBreakpoint();
    const [form] = Form.useForm();

    return (
        <>
            <div className="security-container-wrapper">
                <div className="password-heading-wrapper">
                    <h3 className="password-heading">Password</h3>
                </div>
                <div className="password-description-wrapper">
                    <p className="password-description">Change your password. Please use 8+ characters with at least 1 number, 1 capital letter and 1 character (#^!@#$).</p>
                </div>
                <div className="password-input-wrapper">
                    <Form
                        className="password-form"
                        layout="vertical"
                        form={form}
                    >
                        <Form.Item label={<label style={{ color: "gray" }}>Current Password</label>}>
                            <Input placeholder="Your Current Password..." />
                        </Form.Item>
                        <Form.Item label={<label style={{ color: "gray" }}>New Password</label>}>
                            <Input placeholder="Your New Password..." />
                        </Form.Item>
                        <Form.Item label={<label style={{ color: "gray" }}>Verify Password</label>}>
                            <Input placeholder="Verify Your New Password" />
                        </Form.Item>
                    </Form>
                </div>
                <div className="password-button-wrapper">
                    <Button type="primary" className="password-button">Save Changes</Button>
                </div>
            </div>

        </>
    );
};

export default SecuritySettingsContainer;