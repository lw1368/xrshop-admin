import { Navigate, createBrowserRouter } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";

import BasicLayout from "@/pages/layout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Page403 from "@/pages/403";
import Page404 from "@/pages/404";
import UserList from "@/pages/users";
import BrandList from "@/pages/brand";
import CategoryList from "@/pages/category";
import RoleList from "@/pages/roles";
import GoodsList from "@/pages/goods";
import OrderList from "@/pages/orders";
import AddressList from "@/pages/address";
import CouponsList from "@/pages/sales/coupons";
import CarouselList from "@/pages/sales/carousel";
import StorageList from "@/pages/storage";

const routes = [
  {
    id: "layout",
    element: <BasicLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
        icon: <UserOutlined rev={undefined} />,
        title: "首页",
      },
      {
        path: "posters",
        title: "营销管理",
        icon: <UserOutlined rev={undefined} />,
        children: [
          {
            path: "/posters/carousel",
            title: "轮播列表",
            element: <CarouselList />,
          },
          {
            path: "/posters/coupons",
            title: "优惠卷",
            element: <CouponsList />,
          },
        ],
      },
      {
        path: "goods",
        title: "商品中心",
        icon: <UserOutlined rev={undefined} />,
        children: [
          {
            path: "/goods/list",
            title: "商品列表",
            element: <GoodsList />,
          },
        ],
      },
      {
        path: "brands",
        title: "品牌管理",
        icon: <UserOutlined rev={undefined} />,
        children: [
          {
            path: "/brands/list",
            title: "品牌列表",
            element: <BrandList />,
          },
        ],
      },
      {
        path: "categories",
        title: "分类管理",
        icon: <UserOutlined rev={undefined} />,
        children: [
          {
            path: "/categories/list",
            title: "分类列表",
            element: <CategoryList />,
          },
        ],
      },
      {
        path: "orders",
        title: "订单中心",
        icon: <UserOutlined rev={undefined} />,
        children: [
          {
            path: "/orders/list",
            title: "订单列表",
            element: <OrderList />,
          },
          {
            path: "/orders/pays",
            title: "支付列表",
            element: <Home />,
          },
        ],
      },
      {
        path: "stores",
        title: "仓库管理",
        icon: <UserOutlined rev={undefined} />,
        children: [
          {
            path: "/stores/list",
            title: "发货列表",
            element: <StorageList />,
          },
          {
            path: "/stores/pays",
            title: "商品库存",
            element: <Home />,
          },
        ],
      },
      {
        path: "systems",
        title: "系统设置",
        icon: <UserOutlined rev={undefined} />,
        children: [
          {
            path: "/systems/users",
            title: "用户列表",
            element: <UserList />,
          },
          {
            path: "/systems/roles",
            title: "角色列表",
            element: <RoleList />,
          },
          {
            path: "/systems/permissions",
            title: "权限列表",
            element: <Home />,
          },
          {
            path: "/systems/address",
            title: "地址管理",
            element: <AddressList />,
          },
          {
            path: "/systems/pays",
            title: "支付方式",
            element: <Home />,
          },
          {
            path: "/systems/platform",
            title: "平台配置",
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
  {
    path: "/404",
    element: <Page404 />,
  },
  {
    path: "/403",
    element: <Page403 />,
  },
];

export { routes };

export default createBrowserRouter(routes);
