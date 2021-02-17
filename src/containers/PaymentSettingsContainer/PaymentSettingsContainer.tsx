import React, { useState } from 'react';
import { Form, Input, Button, } from 'antd';
import "./PaymentSettingsContainer.css";
// import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useAuthorisedContext } from "../../context/authorised-layout-context";

const PaymentSettingsContainer = () => {

    //   const screens = useBreakpoint();
    const [form] = Form.useForm();
    const [editMode, setEditMode] = useState<boolean>(false);
    const { userDetails } = useAuthorisedContext();

    const handleEdit = () => {
        setEditMode(true);
      }
    
      const handleSave = () => {
        setEditMode(false);
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
                        <Input
                            className="payment-form"
                            placeholder="DDGHXUZIQ76213SGQ78"
                            value={userDetails.stellar_address}
                            disabled={!editMode}
                        />
                    </Form.Item>
                    <Form.Item label={<label style={{ color: "gray" }}>Secret Key</label>}>
                        <Input
                            className="payment-form"
                            placeholder="Your Secret key is hidden"
                            value={userDetails.secret_key}
                            disabled={!editMode}
                        />
                    </Form.Item>
                    <Form.Item label={<label style={{ color: "gray" }}>Address</label>}>
                        <Input
                            className="payment-form"
                            placeholder="name*clickpesa.com"
                            value={userDetails.address}
                            disabled={!editMode}
                        />
                    </Form.Item>
                    <Form.Item label={<label style={{ color: "gray" }}>Default Currency</label>}>
                        <Input
                            className="payment-form"
                            placeholder="TZS"
                            value={userDetails.currency}
                            disabled={!editMode}
                        />
                    </Form.Item>
                </Form>
            </div>
            <div className="payment-button-wrapper">
                {!editMode && <Button type="primary" className="payment-edit-button" onClick={handleEdit} >Edit</Button>}
                {editMode && <Button type="primary" className="payment-save-button" onClick={handleSave} >Save Changes</Button>}
            </div>
        </div>
    );
};

export default PaymentSettingsContainer;