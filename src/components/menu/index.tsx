import { Menu } from "antd";

import {
  NonIndexRouteObject,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";
import type { MenuProps } from "antd/es/menu";

import { HeartFilled } from "@ant-design/icons";

import { routes } from "@/router";

import { useStore } from "@/stores";

import styles from "./index.module.scss";

type RouteType = NonIndexRouteObject & {
  title: string;
  icon: React.ReactElement;
};

const SideMenu: React.FC = () => {
  const collapsed = useStore((state) => state.collapsed);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, []);

  const handleLogoClick = () => {
    navigate("/home");
  };

  // menu 菜单
  const getItems: any = (children: RouteType[]) => {
    return children.map((item) => {
      return {
        key: item.path,
        icon: item.icon || <HeartFilled rev={undefined} />,
        label: item.title,
        children: item.children ? getItems(item.children) : null,
      };
    });
  };

  const menuItems: MenuProps["items"] = getItems(routes[0].children);

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    navigate(key);
  };
  return (
    <div>
      <div className={styles.logo} onClick={handleLogoClick}>
        <img src="/vite.svg" className={styles.img} alt="" />
        {collapsed ? "" : <span>xrshop</span>}
      </div>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={selectedKeys}
        onClick={handleMenuClick}
        items={menuItems}
      />
    </div>
  );
};

export default SideMenu;
