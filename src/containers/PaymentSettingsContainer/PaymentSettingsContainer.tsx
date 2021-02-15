import React from 'react';
import { Form, Input, Button, } from 'antd';
import "./PaymentSettingsContainer.css";
// import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const PaymentSettingsContainer = () => {

    //   const screens = useBreakpoint();
    const [form] = Form.useForm();

    const userPaymentDetails = {
        stellar_address: "FRT45YD89FDE4083938E5",
        secret_key: "hidden",
        address: "john*clickpesa.com",
        currency: "USD"
    }

    return (
        <div className="payment-container-wrapper">
            <div className="payment-heading-wrapper">
                <h3 className="payment-heading">Payment</h3>
            </div>
            <div className="payment-input-wrapper">
                <Form
                    className="payment-form"
                    layout="vertical"
                    form={form}
                >
                    <Form.Item label={<label style={{ color: "gray" }}>Stellar Address</label>}>
                        <Input className="payment-form" placeholder="DDGHXUZIQ76213SGQ78" value={userPaymentDetails.stellar_address} />
                    </Form.Item>
                    <Form.Item label={<label style={{ color: "gray" }}>Secret Key</label>}>
                        <Input className="payment-form" placeholder="Your Secret key is hidden" value={userPaymentDetails.secret_key} />
                    </Form.Item>
                    <Form.Item label={<label style={{ color: "gray" }}>Address</label>}>
                        <Input className="payment-form" placeholder="name*clickpesa.com" value={userPaymentDetails.address} />
                    </Form.Item>
                    <Form.Item label={<label style={{ color: "gray" }}>Default Currency</label>}>
                        <Input className="payment-form" placeholder="TZS" value={userPaymentDetails.currency} />
                    </Form.Item>
                </Form>
            </div>
            <div className="payment-button-wrapper">
                <Button type="primary" className="payment-button">Edit</Button>
            </div>
        </div>
    );
};

export default PaymentSettingsContainer;