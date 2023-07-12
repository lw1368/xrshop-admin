import { Layout } from "antd";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import SideMenu from "@/components/menu";
import NavFooter from "@/components/navfooter";
import NavHeader from "@/components/navheader";

import { useStore } from "@/stores";

import storage from "@/utils/storage";

import styles from "./index.module.scss";

const { Sider } = Layout;

const BasicLayout: React.FC = () => {
  const { collapsed } = useStore();

  // 获取用户信息

  // 权限处理

  return (
    <Layout>
      <Sider collapsed={collapsed}>
        <SideMenu />
      </Sider>
      <Layout>
        <NavHeader />

        <div className={styles.content}>
          <div className={styles.wrapper}>
            <Outlet />
          </div>
          <NavFooter />
        </div>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
