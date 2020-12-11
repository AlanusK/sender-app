import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import CustomHeader from "./Header/Header";
import "./AuthorisedLayout.css";
import { AuthorisedLayoutContextProvider } from "../../../context/authorised-layout-context";
import SiteFooter from "./Footer/Footer";
import { useRouter } from "../../../hooks/useRouter";

const { Content } = Layout;
const AuthorisedLayout = ({ children }: any) => {
  const { pathname } = useRouter();
  return (
    <Layout>
      <AuthorisedLayoutContextProvider>
        <Sidebar />
        <Layout className="site-layout">
          <CustomHeader />
          <Content
            className="site-layout-background"
            style={{
              margin: pathname === "/settings" ? 0 : "20px 14px",
              padding: pathname === "/settings" ? 0 : 24,
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
