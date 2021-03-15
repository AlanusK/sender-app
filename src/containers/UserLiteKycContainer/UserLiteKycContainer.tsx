import React, { useState, useEffect } from "react";
import "./UserLiteKycContainer.css";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  KeyOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useAsync } from "../../hooks/useAsync";
import { useRouter } from "../../hooks/useRouter";
import { StellarUtils } from "../../stellarUtility";
import { StellarWalletBalanceProps } from "../../types";
import localForage from "localforage";
interface ICustomerRegistrationDetails {
  anchor_id: string;
  full_name: string;
  email: string;
  has_authentication: boolean;
  attach_wallet?: boolean;
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
  const [showWalletInput, setShowWalletInput] = useState(false);
  const [userDetails, setSetDetails] = useState<ICustomerRegistrationDetails>();
  const [
    isProcessingNonCustodialRegistration,
    setIsProcessingNonCustodialRegistration,
  ] = useState<boolean>(false);
  const [isValidStellarWallet, setIsValidStellarWallet] = useState<boolean>(
    true
  );
  const [invalidWalletMessage, setInvalidWalletMessage] = useState<
    string | null
  >(null);
  const [userSecret, setUserSecret] = useState("");

  const onCheckboxChange = (e: any) => {
    setShowWalletInput(e.target.checked);
  };


  const checkWalletTrustlines = async (publicKey: string) => {
    const walletDetails = await StellarUtils.WalletDetails(publicKey);
    const walletCurrencies = walletDetails.balances.map((asset: any) => [
      asset.asset_code,
    ]);
    return Promise.resolve(
      walletCurrencies.flat().includes("TZS" && "KES") ? true : false
    );
  };

  const createTrustlines = async (secretKey: string) => {
    const publicKey = await StellarUtils.getStellarPublicKey(secretKey);
    const walletDetails = await StellarUtils.WalletDetails(publicKey);
    const XLM = walletDetails.balances.find(
      (asset: StellarWalletBalanceProps) => asset.asset_type === "native"
    );
    if (+XLM.balance < 2.1) {
      setIsValidStellarWallet(false);
      return setInvalidWalletMessage(
        "Wallet has insufficient balance to establish default trustlines"
      );
    }
    return StellarUtils.establishDefaultTrustlines(secretKey);
  };

  const handleNonCustodialRegistration = async (
    formValues: IUserRegistrationFormValues
  ) => {
    setIsProcessingNonCustodialRegistration(true);
    let userWalletPublicKey;
    setIsValidStellarWallet(true);
    const validKey = await StellarUtils.validateStellarWalletSecretKey(
      formValues.walletSecretKey
    );
    if (!validKey) {
      setInvalidWalletMessage("Invalid wallet address");
      setIsProcessingNonCustodialRegistration(false);
      return setIsValidStellarWallet(false);
    }
    try {
      userWalletPublicKey = await StellarUtils.getStellarPublicKey(
        formValues.walletSecretKey
      );
      const hasTrustline = await checkWalletTrustlines(userWalletPublicKey);
      if (!hasTrustline) {
        const createTrustLineTransaction = await createTrustlines(
          formValues.walletSecretKey
        );
        if (!createTrustLineTransaction?.hash)
          return setIsProcessingNonCustodialRegistration(false);
      }
      setIsProcessingNonCustodialRegistration(false);
      registerCustomerAuth(formValues);
      initiateCustomerRegistration(formValues, userWalletPublicKey);
    } catch (error) {
      console.log("error :>> ", error);
      setIsProcessingNonCustodialRegistration(false);
      setInvalidWalletMessage(error);
      return setIsValidStellarWallet(false);
    }
  };

  const registerCustomerAuth = (formValues: IUserRegistrationFormValues) => {
    executeAuthRegistration({
      email_address: formValues.email,
      password: formValues.password,
    });
  };
  const initiateCustomerRegistration = (
    formValues: IUserRegistrationFormValues,
    userPublicKey?: string
  ) => {
    const customerDetails: ICustomerRegistrationDetails = {
      anchor_id: "cpsep24anchor",
      full_name: `${formValues.firstName}  ${formValues.lastName}`,
      email: formValues.email,
      has_authentication: true,
      ...(!showWalletInput && { attach_wallet: true }),
      ...(showWalletInput && userPublicKey && { sep24_account: userPublicKey }),
    };
    setUserSecret(
      showWalletInput && userPublicKey ? formValues.walletSecretKey : ""
    );
    setSetDetails(customerDetails);
  };

  const handleCustodialRegistration = (
    formValues: IUserRegistrationFormValues
  ) => {
    registerCustomerAuth(formValues);
    initiateCustomerRegistration(formValues);
  };

  const onFinish = async (values: IUserRegistrationFormValues) => {
    if (values) {
      if (values?.walletSecretKey) {
        return handleNonCustodialRegistration(values);
      }
      return handleCustodialRegistration(values);
    }
  };

  useEffect(() => {
    if (
      authRegistrationStatus === "success" &&
      authRegistrationValue?.data.id
    ) {
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
      localForage.setItem(
        "user_key",
        userSecret + ":" + value?.data.id
      );
      replace("/login");
    }
  }, [replace, status, value?.data.id]);

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
                authRegistrationStatus === "pending" ||
                status === "pending" ||
                isProcessingNonCustodialRegistration
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
                authRegistrationStatus === "pending" ||
                status === "pending" ||
                isProcessingNonCustodialRegistration
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
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              disabled={
                authRegistrationStatus === "pending" ||
                status === "pending" ||
                isProcessingNonCustodialRegistration
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
                authRegistrationStatus === "pending" ||
                status === "pending" ||
                isProcessingNonCustodialRegistration
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
                authRegistrationStatus === "pending" ||
                status === "pending" ||
                isProcessingNonCustodialRegistration
                  ? true
                  : false
              }
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={showWalletInput}
              onChange={onCheckboxChange}
              disabled={
                authRegistrationStatus === "pending" ||
                status === "pending" ||
                isProcessingNonCustodialRegistration
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
                required: showWalletInput ? true : false,
                message: "Please enter wallet secret key!",
              },
            ]}
            hidden={!showWalletInput}
            validateStatus={!isValidStellarWallet ? "error" : ""}
            help={
              !isValidStellarWallet
                ? invalidWalletMessage
                : "Your secret key is not shared to ClickPesa"
            }
          >
            <Input.Password
              prefix={<KeyOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Wallet Secret Key"
              disabled={
                authRegistrationStatus === "pending" ||
                status === "pending" ||
                isProcessingNonCustodialRegistration
                  ? true
                  : false
              }
              onChange={() => setIsValidStellarWallet(true)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item style={{ marginTop: showWalletInput ? "20px" : "" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={
                authRegistrationStatus === "pending" ||
                status === "pending" ||
                isProcessingNonCustodialRegistration
                  ? true
                  : false
              }
              loading={
                authRegistrationStatus === "pending" ||
                status === "pending" ||
                isProcessingNonCustodialRegistration
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
          status === "pending" ||
          isProcessingNonCustodialRegistration ? null : (
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
