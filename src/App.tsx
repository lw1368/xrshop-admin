// import { Suspense } from "react";
import { ConfigProvider } from "antd";

import zhCN from "antd/locale/zh_CN";

import { RouterProvider } from "react-router-dom";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
// import $styles from "@/assets/styles/app.module.css";

import router from "./router";
// import { useGlobalStore } from "./stores";

dayjs.locale("zh-cn");

const App = () => {
  // const { primaryColor } = useGlobalStore();

  return (
    <ConfigProvider
      locale={zhCN}
      // theme={{
      //   token: {
      //     colorPrimary: primaryColor,
      //   },
      // }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
