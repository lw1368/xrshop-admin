import { ConfigEnv, UserConfig } from "vite";
import merge from "deepmerge";

import { Configure } from "./types";
import { pathResolve } from "./utils";
import { createPlugins } from "./plugins";

export const createConfig = (
  params: ConfigEnv,
  configure?: Configure
): UserConfig => {
  const isBuild = params.command === "build";
  return merge<UserConfig>(
    {
      resolve: {
        alias: {
          "@": pathResolve("src"),
        },
      },
      css: {
        modules: {
          localsConvention: "camelCaseOnly",
        },
      },
      plugins: createPlugins(isBuild),
      server: {
        // port: 8080, // 开发环境启动的端口
        proxy: {
          "/api": {
            // 当遇到 /api 路径时，将其转换成 target 的值
            target: "http://127.0.0.1:8080/api/",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""), // 将 /api 重写为空
          },
        },
      },
    },
    typeof configure === "function" ? configure(params, isBuild) : {},
    {
      arrayMerge: (_d, s, _o) => Array.from(new Set([..._d, ...s])),
    }
  );
};
