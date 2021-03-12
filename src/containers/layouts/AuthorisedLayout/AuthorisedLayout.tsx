import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import CustomHeader from "./Header/Header";
import "./AuthorisedLayout.css";
import { AuthorisedLayoutContextProvider } from "../../../context/authorised-user-context";
import SiteFooter from "./Footer/Footer";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { WalletOperationsContextProvider } from "../../../context/wallet-operations-context";
import { useLocation } from "react-router-dom";
//import { ModalContextProvider } from "../../../context/payout-context";
import { TransactionsContextProvider } from "../../../context/transactions-context";

const { Content } = Layout;
const AuthorisedLayout = ({ children }: any) => {
  const location = useLocation();
  const screens = useBreakpoint();
  const [mobileView, setMobileView] = useState<Boolean>(false);
  const [transactionContentLayout, setTransactionContentLayout] = useState<Boolean>(false);
  const pathnames = location.pathname.split('/').filter((item: any) => item);
  useEffect(() => {
    if (pathnames[0] === "transactions") {
      setTransactionContentLayout(true)
    } else
      setTransactionContentLayout(false)
  }, [pathnames])
  
  useEffect(() => {
    if (screens.xs) {
      setMobileView(true)
    } else
      setMobileView(false)
  }, [screens.xs, setMobileView])
  
  return (
    <Layout className="layout-wrapper">
      <AuthorisedLayoutContextProvider>
        {mobileView ? null : <Sidebar isSmallScreen={screens.xs === true ? true : false} />}
        <Layout className="site-layout">
          <CustomHeader />
          <WalletOperationsContextProvider>
          <TransactionsContextProvider>
            {transactionContentLayout ?
              <Content
                className="site-layout-background"
                style={{
                  margin: "14px 14px",
                  padding: 0,
                  minHeight: 280,
                }}
              >
                {children}
              </Content> :
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
            }
            </TransactionsContextProvider>
          </WalletOperationsContextProvider>
          <SiteFooter />
        </Layout>
      </AuthorisedLayoutContextProvider>
    </Layout>
  );
};

export default AuthorisedLayout;
