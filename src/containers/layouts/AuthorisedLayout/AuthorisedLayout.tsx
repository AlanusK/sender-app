import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import CustomHeader from "./Header/Header";
import "./AuthorisedLayout.css";
import { AuthorisedLayoutContextProvider } from "../../../context/authorised-layout-context";
import SiteFooter from "./Footer/Footer";
import { useRouter } from "../../../hooks/useRouter";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { ModalContextProvider } from "../../../context/modal-context";

const { Content } = Layout;
const AuthorisedLayout = ({ children }: any) => {
  const { pathname } = useRouter();
  const screens = useBreakpoint();
  return (
    <Layout>
      <AuthorisedLayoutContextProvider>
        <ModalContextProvider>
        <Sidebar isSmallScreen={screens.xs === true ? true : false} />
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
        </ModalContextProvider>
      </AuthorisedLayoutContextProvider>
    </Layout>
  );
};

export default AuthorisedLayout;
