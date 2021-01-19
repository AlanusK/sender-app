import React, { useState, useEffect } from 'react';
import "./UserLiteKycContainer.css";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const UserLiteKycContainer = () => {

    const [form] = Form.useForm();
    const [showWallet, setShowWallet] = useState(false);

    // useEffect(() => {
    //     form.validateFields(['walletSecretKey']);
    // }, [showWallet]);

    const onCheckboxChange = (e: any) => {
        setShowWallet(e.target.checked);
    };

    // const onFinish = values => {
    //     console.log('Received values of form: ', values);
    // };

    return (
        <>
            <div className="user-lite-KYC-container-wrapper">
                <div className="user-lite-form-wrapper">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    >
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'Please input your first name!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First name" />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: 'Please input your last name!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="repeatPassword"
                            rules={[{ required: true, message: 'Please repeat your password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Repeat Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox
                                checked={showWallet}
                                onChange={onCheckboxChange}
                            >
                                Using existing Stellar wallet
                            </Checkbox>
                        </Form.Item>
                        <Form.Item
                            name="walletSecretKey"
                            rules={[{ required: true, message: 'Please enter wallet secret key!' }]}
                            hidden={!showWallet}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Wallet Secret Key"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Register
                            </Button>
                            Already have an account? <a href="/login">Login now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </>
    );
};

export default UserLiteKycContainer;