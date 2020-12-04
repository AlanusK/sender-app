import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import CustomHeader from "./Header/Header";
import "./AuthorisedLayout.css";
import { AuthorisedLayoutContextProvider } from "../../../context/authorised-layout-context";
import SiteFooter from "./Footer/Footer";

const { Content } = Layout;
const AuthorisedLayout = ({ children }: any) => {
  return (
    <Layout>
      <AuthorisedLayoutContextProvider>
        <Sidebar />
        <Layout className="site-layout">
          <CustomHeader />
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
          <SiteFooter />
        </Layout>
      </AuthorisedLayoutContextProvider>
    </Layout>
  );
};

export default AuthorisedLayout;
