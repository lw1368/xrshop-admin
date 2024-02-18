import React, { ChangeEvent } from "react";
import {
  Avatar,
  Badge,
  Breadcrumb,
  ColorPicker,
  Dropdown,
  Space,
  Switch,
} from "antd";
import type { MenuProps } from "antd";

import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { Color } from "antd/es/color-picker";

import storage from "@/utils/storage";
import { useStore } from "@/stores";

import useGlobalStore from "@/stores/global";

import { useDebounce } from "@/utils/useDebounce";

import styles from "./index.module.scss";

const NavHeader: React.FC = () => {
  const { userInfo, collapsed, updateCollapsed } = useStore();
  const { primaryColor, setColor } = useGlobalStore();
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
      label: `邮箱：${userInfo.userEmail}`,
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
  const handleColorChange = (value: Color, hex: string) => {
    setColor(hex);
    // useDebounce(setColor(hex), 500);
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
        <Space size={20}>
          <Badge count={12}>
            <BellOutlined style={{ fontSize: 24 }} rev={undefined} />
          </Badge>
          <ColorPicker value={primaryColor} onChange={handleColorChange} />
          {/* <Switch
          checkedChildren="黑暗"
          unCheckedChildren="默认"
          style={{ marginRight: 10 }}
        /> */}
          <Dropdown menu={{ items, onClick }} trigger={["click"]}>
            <Avatar
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              style={{ cursor: "pointer" }}
            />
            {/* <span className={styles.nickName}>
              {userInfo.userName || "123"}
            </span> */}
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default NavHeader;
