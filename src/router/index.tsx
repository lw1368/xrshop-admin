import { Navigate, createBrowserRouter } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";

import BasicLayout from "@/pages/layout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Page403 from "@/pages/403";
import Page404 from "@/pages/404";

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
        path: "systems",
        title: "系统设置",
        icon: <UserOutlined rev={undefined} />,
        children: [
          {
            path: "/systems/users",
            title: "用户列表",
            element: <Home />,
          },
          {
            path: "/systems/roles",
            title: "角色列表",
            element: <Home />,
          },
          {
            path: "/systems/permissions",
            title: "权限列表",
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
