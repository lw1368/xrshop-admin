// import { Suspense } from "react";
import { ConfigProvider, App as AntdApp } from "antd";

import zhCN from "antd/locale/zh_CN";
import { ApolloProvider } from "@apollo/client";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import { RouterProvider } from "react-router-dom";

import useGlobalStore from "./stores/global";
import AntdGlobal from "./utils/antdGlobal";
import router from "./router";
import { client } from "./utils/apollo";
import "./app.scss";

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
      <ApolloProvider client={client}>
        <AntdApp>
          <AntdGlobal />

          <RouterProvider router={router} />
        </AntdApp>
      </ApolloProvider>
    </ConfigProvider>
  );
};

export default App;
