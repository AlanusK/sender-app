import React, { useState, useEffect } from "react";
import "./UserLiteKycContainer.css";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAsync } from "../../hooks/useAsync";
import { useRouter } from "../../hooks/useRouter";

interface ICustomerRegistrationDetails {
  anchor_id: string;
  full_name: string;
  email: string;
  has_authentication: boolean;
  attach_wallet: boolean;
}

interface IUserRegistrationFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  walletSecretKey: string;
}

interface IUserAuthDetails {
  email_address: string;
  password: string;
}
const Axios = require("axios").default;

const registerCustomer = (customerDetails: ICustomerRegistrationDetails) => {
  return Promise.resolve(
    Axios.post(`${process.env.REACT_APP_API_URL}/customer`, customerDetails)
  );
};

const createUserAuthenticationProfile = (authDetails: IUserAuthDetails) => {
  return Promise.resolve(
    Axios.post(`${process.env.REACT_APP_API_URL}/register`, authDetails)
  );
};

const UserLiteKycContainer = () => {
  const {
    execute: executeAuthRegistration,
    status: authRegistrationStatus,
    value: authRegistrationValue,
    error: authRegistrationError = "",
  } = useAsync(createUserAuthenticationProfile, false);
  const { execute, status, value, error = "" } = useAsync(
    registerCustomer,
    false
  );
  const { replace } = useRouter();
  const [showWallet, setShowWallet] = useState(false);
  const [userDetails, setSetDetails] = useState<ICustomerRegistrationDetails>();

  const onCheckboxChange = (e: any) => {
    setShowWallet(e.target.checked);
  };

  const onFinish = async (values: IUserRegistrationFormValues) => {
    console.log("Received values of form: ", values);
    if (values) {
      executeAuthRegistration({
        email_address: values.email,
        password: values.password,
      });
      const customerDetails: ICustomerRegistrationDetails = {
        anchor_id: "cpsep24anchor",
        full_name: `${values.firstName}  ${values.lastName}`,
        email: values.email,
        has_authentication: true,
        attach_wallet: true,
      };
      setSetDetails(customerDetails);
    }
  };

  useEffect(() => {
    if (
      authRegistrationStatus === "success" &&
      authRegistrationValue?.data.id
    ) {
      console.log("userDetails :>> ", userDetails);
      execute(userDetails);
    }
  }, [
    authRegistrationStatus,
    authRegistrationValue?.data.id,
    execute,
    userDetails,
  ]);

  useEffect(() => {
    if (status === "success" && value?.data.id) {
      notification["success"]({
        message: "Almost there...",
        description:
          "To complete registration please verify your email address.",
        duration: 10,
      });
      replace("/login");
    }
  }, [replace, status, value?.data.id]);

  console.log(" status, value, erro :>> ", status, value, error);

  console.log(
    "  status: authRegistrationStatus ",
    authRegistrationStatus,
    authRegistrationValue,
    authRegistrationError
  );

  return (
    <div className="user-lite-KYC-container-wrapper">
      <div className="user-lite-form-wrapper">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First name"
              disabled={
                authRegistrationStatus === "pending" || status === "pending"
                  ? true
                  : false
              }
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            validateStatus={error?.toString().includes("409") ? "error" : ""}
            help={
              error?.toString().includes("409")
                ? "Registration not complete, contact ClickPesa support"
                : null
            }
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last name"
              disabled={
                authRegistrationStatus === "pending" || status === "pending"
                  ? true
                  : false
              }
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
            validateStatus={
              authRegistrationError?.toString().includes("409")
                ? "error"
                : "success"
            }
            help={
              authRegistrationError?.toString().includes("409") //clickpesa address exists
                ? "Account exists using this email, Please login"
                : null
            }
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              disabled={
                authRegistrationStatus === "pending" || status === "pending"
                  ? true
                  : false
              }
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              disabled={
                authRegistrationStatus === "pending" || status === "pending"
                  ? true
                  : false
              }
            />
          </Form.Item>
          <Form.Item
            name="repeatPassword"
            rules={[
              { required: true, message: "Please repeat your password!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Repeat Password"
              disabled={
                authRegistrationStatus === "pending" || status === "pending"
                  ? true
                  : false
              }
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={showWallet}
              onChange={onCheckboxChange}
              disabled={
                authRegistrationStatus === "pending" || status === "pending"
                  ? true
                  : false
              }
            >
              Using existing Stellar wallet
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="walletSecretKey"
            rules={[
              {
                required: showWallet ? true : false,
                message: "Please enter wallet secret key!",
              },
            ]}
            hidden={!showWallet}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Wallet Secret Key"
              disabled={
                authRegistrationStatus === "pending" || status === "pending"
                  ? true
                  : false
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={
                authRegistrationStatus === "pending" || status === "pending"
                  ? true
                  : false
              }
              loading={
                authRegistrationStatus === "pending" || status === "pending"
                  ? true
                  : false
              }
            >
              {authRegistrationStatus === "pending"
                ? "Creating auth..."
                : status === "pending"
                ? "Registering..."
                : "Register"}
            </Button>
          </Form.Item>
          {authRegistrationStatus === "pending" ||
          status === "pending" ? null : (
            <Form.Item>
              Already have an account? <a href="/login">Login now!</a>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};

export default UserLiteKycContainer;
