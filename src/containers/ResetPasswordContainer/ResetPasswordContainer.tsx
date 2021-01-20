import React from 'react';
import "./ResetPasswordContainer.css";
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const ResetPasswordContainer = () => {

    const [form] = Form.useForm();

    return (
        <div className="reset-password-container-wrapper">
            <div className="reset-password-heading-wrapper">
                <h3 className="reset-password-heading">Reset Password Container</h3>
            </div>
            <div className="reset-password-form-wrapper">
                <Form
                    name="reset-password-form"
                    className="reset-password-form"
                    initialValues={{ remember: true }}
                // onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email' }]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Your Email" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Reset Password
                            </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ResetPasswordContainer;