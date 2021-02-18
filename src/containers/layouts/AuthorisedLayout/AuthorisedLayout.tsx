import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import CustomHeader from "./Header/Header";
import "./AuthorisedLayout.css";
import { AuthorisedLayoutContextProvider } from "../../../context/authorised-layout-context";
import SiteFooter from "./Footer/Footer";
import { useRouter } from "../../../hooks/useRouter";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { PayoutContextProvider } from "../../../context/payout-context";
//import { ModalContextProvider } from "../../../context/payout-context";

const { Content } = Layout;
const AuthorisedLayout = ({ children }: any) => {
  const { pathname } = useRouter();
  const screens = useBreakpoint();
  return (
    <Layout>
      <AuthorisedLayoutContextProvider>
        <Sidebar isSmallScreen={screens.xs === true ? true : false} />
        <Layout className="site-layout">
          <CustomHeader />
          <PayoutContextProvider>
            <Content
              className="site-layout-background"
              style={{
                margin: "14px 14px",
                padding: 24,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </PayoutContextProvider>
          <SiteFooter />
        </Layout>
      </AuthorisedLayoutContextProvider>
    </Layout>
  );
};

export default AuthorisedLayout;
