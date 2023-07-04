// import { Suspense } from "react";
import { ConfigProvider, App as AntdApp } from "antd";

import zhCN from "antd/locale/zh_CN";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import { RouterProvider } from "react-router-dom";

import useGlobalStore from "./stores/global";

import router from "./router";

dayjs.locale("zh-cn");

const App = () => {
  const { primaryColor } = useGlobalStore();

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      <AntdApp>
        {/* <AntdGlobal /> */}
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
