import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "../../hooks/useRouter";
import { useAsync } from "../../hooks/useAsync";

const Login = () => {
  const { signin, setAuthentication } = useAuth();
  const { replace, query } = useRouter();
  const { execute, status, value, error = "" } = useAsync(signin, false);

  const onFinish = (values: { username: string; password: string }) => {
    return execute(values);
  };
  //console.log(" status, value, error :>> ", status, value, error);
  useEffect(() => {
    if (status === "success") {
      if (value.data.success === true) {
        message.success("Login Success");
        setAuthentication(true);
        return replace(query.redirect ? query.redirect : "/");
      }
      return message.error("Something is wrong, contact ClickPesa support");
    }
  }, [query.redirect, replace, setAuthentication, status, value]);

  useEffect(() => {
    if (status === "error") {
      setAuthentication(false);
      const errorMessage = error?.toString().includes("400")
        ? "Incorect username / password combination"
        : "Something went wrong, Try again later.";
      message.error(errorMessage);
    }
  }, [error, setAuthentication, status]);
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
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
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={status === "pending" ? true : false}
        >
          {status !== "pending" ? " Log in" : "Authenticating..."}
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default Login;
