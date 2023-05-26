import { Button, ConfigProvider, theme } from "antd";

import { StyleProvider } from "@ant-design/cssinjs";
import zhCN from "antd/locale/zh_CN";

import $styles from "./assets/styles/app.module.css";

const App = () => {
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
          <div className={$styles.container}>
            <span>React</span>
            <Button
              type="default"
              // className="!tw-bg-lime-400 !tw-text-emerald-900"
              href="https://pincman.com/3r"
              target="_blank"
            >
              点此打开
            </Button>
          </div>
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default App;
