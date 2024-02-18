import { ConfigEnv, UserConfig } from "vite";
import merge from "deepmerge";

import { Configure } from "./types";
import { pathResolve } from "./utils";

export const createConfig = (
  params: ConfigEnv,
  configure?: Configure
): UserConfig => {
  const isBuild = params.command === "build";
  return merge<UserConfig>(
    {
      server: {
        // port: 3000,
        cors: true,
        proxy: {
          "/graphql": {
            target: "http://localhost:3000/",
            changeOrigin: true,
            // rewrite: (path) => path.replace(/^\/graphql/, ''),
          },
          "/api": {
            target: "http://106.52.251.215:8080/",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
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
      // plugins: [
      //   createPlugins(isBuild),
      //   legacy({
      //     targets: ['defaults', 'not IE 11']
      //   }),
      // ],
      // base: './',
    },
    typeof configure === "function" ? configure(params, isBuild) : {},
    {
      arrayMerge: (_d, s, _o) => Array.from(new Set([..._d, ...s])),
    }
  );
};
