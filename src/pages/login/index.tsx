import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Divider, Space, Tabs } from "antd";
import type { CSSProperties } from "react";
import { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";

import { useNavigate } from "react-router-dom";

import { message } from "@/utils/antdGlobal";

import storage from "@/utils/storage";

import { LOGIN, SEND_CODE_MSG } from "@/graphql/login";

import request from "@/utils/request";

type LoginType = "phone" | "account";
interface LoginValue {
  phone: string;
  code: string;
  autoLogin: boolean;
}
const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "XrShop - 登录";
    if (storage.get("token")) navigate("/");
  }, []);

  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);

  const [loginType, setLoginType] = useState<LoginType>("phone");

  const loginHandler = async (value: LoginValue) => {
    const res = await login({
      variables: value,
    });

    if (res.data.login.code === 200) {
      storage.set("token", res.data.login.data);
      message.success(res.data.login.message);
      const params = new URLSearchParams(window.location.search);
      setTimeout(() => {
        window.location.href = params.get("callback") || "/";
      });
    } else {
      message.error(res.data.login.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh", // 'calc( - 48px)',
        overflow: "hidden",
        width: "100vw",
      }}
    >
      <LoginFormPage
        onFinish={loginHandler}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="XrShop"
        subTitle="xrshop商城后台管理系统"
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider plain>
              <span
                style={{ color: "#CCC", fontWeight: "normal", fontSize: 14 }}
              >
                其他登录方式
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <AlipayOutlined
                  style={{ ...iconStyles, color: "#1677FF" }}
                  rev={undefined}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <TaobaoOutlined
                  style={{ ...iconStyles, color: "#FF6A10" }}
                  rev={undefined}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <WeiboOutlined
                  style={{ ...iconStyles, color: "#333333" }}
                  rev={undefined}
                />
              </div>
            </Space>
          </div>
        }
      >
        <Tabs
          centered
          items={[
            {
              key: "phone",
              label: "手机号登录",
            },
            {
              key: "account",
              label: "账号密码登录",
            },
          ]}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        />

        {loginType === "account" && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className="prefixIcon" rev={undefined} />,
              }}
              placeholder="用户名: admin or user"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className="prefixIcon" rev={undefined} />,
              }}
              placeholder="密码: ant.design"
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
          </>
        )}
        {loginType === "phone" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: (
                  <MobileOutlined className="prefixIcon" rev={undefined} />
                ),
              }}
              name="phone"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: "请输入手机号！",
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "手机号格式错误！",
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className="prefixIcon" rev={undefined} />,
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder="请输入验证码"
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${"获取验证码"}`;
                }
                return "获取验证码";
              }}
              name="code"
              phoneName="phone"
              rules={[
                {
                  required: true,
                  message: "请输入验证码！",
                },
              ]}
              onGetCaptcha={async (phone: string) => {
                const res1 = await request.post<string>(
                  "http://106.52.251.215:8080/message"
                );

                console.log(res1);

                return;

                // 获取验证码
                const res = await run({
                  variables: {
                    phone,
                  },
                });
                if (res.data.sendCodeMsg.code === 200) {
                  // message.success(res.data.sendCodeMsg.message);
                  message.success(
                    `获取验证码成功！验证码为：${res.data.sendCodeMsg.data}`
                  );
                } else {
                  message.error(res.data.sendCodeMsg.message);
                }
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: "right",
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
