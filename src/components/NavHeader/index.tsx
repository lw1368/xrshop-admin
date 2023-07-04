import React from "react";
import { Breadcrumb, Dropdown, Switch } from "antd";
import type { MenuProps } from "antd";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import storage from "@/utils/storage";
import { useStore } from "@/stores";

import styles from "./index.module.scss";

const NavHeader: React.FC = () => {
  const { userInfo, collapsed, updateCollapsed } = useStore();
  const breadList = [
    {
      title: "首页",
    },
    {
      title: "工作台",
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "email",
      label: `邮箱：`, // ${userInfo.userEmail}`,
    },
    {
      key: "logout",
      label: "退出",
    },
  ];

  // 控制菜单图标关闭和展开
  const toggleCollapsed = () => {
    updateCollapsed();
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      storage.remove("token");
      window.location.href = `/login?callback=${encodeURIComponent(
        window.location.href
      )}`;
    }
  };
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div onClick={toggleCollapsed}>
          {collapsed ? (
            <MenuUnfoldOutlined rev={undefined} />
          ) : (
            <MenuFoldOutlined rev={undefined} />
          )}
        </div>
        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className="right">
        <Switch
          checkedChildren="黑暗"
          unCheckedChildren="默认"
          style={{ marginRight: 10 }}
        />
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <span className={styles.nickName}>{userInfo.userName || "123"}</span>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavHeader;
