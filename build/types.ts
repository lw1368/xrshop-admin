import { ConfigEnv, UserConfig } from "vite";

export type Configure = (param: ConfigEnv, isBuild: boolean) => UserConfig;
