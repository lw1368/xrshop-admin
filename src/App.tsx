// import { Suspense } from "react";
import { ConfigProvider, theme, Button } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import zhCN from "antd/locale/zh_CN";

import { RouterProvider } from "react-router-dom";

import $styles from "@/assets/styles/app.module.css";

import router from "./router";

const App = () => {
  return <RouterProvider router={router} />;

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#262626",
        },
        components: {
          Layout: {
            colorBgBody: "#262626",
          },
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <div className={$styles.app}>
          <RouterProvider router={router} />

          <div className={$styles.container}>
            <span>React</span>
            <Button
              type="default"
              // className="!tw-bg-lime-400 !tw-text-emerald-900"
              // href="https://pincman.com/3r"
              // target="_blank"
            >
              点此打开
            </Button>
          </div>
        </div>
        {/* <RouterProvider router={router} /> */}
      </StyleProvider>
    </ConfigProvider>
  );
};

export default App;
